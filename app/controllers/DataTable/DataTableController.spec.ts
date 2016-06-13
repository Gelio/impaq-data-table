/// <reference path="../../../typings/main.d.ts" />
import { IDataTableController } from './DataTableController.d.ts';
import {IUserView, User} from '../../User';
const mockData = {
    'users': [
        {
            'id': 1,
            'name': 'Uma',
            'surname': 'Ellison',
            'birthDate': '24-10-1984',
            'mobile': '653820575',
            'address': '3167 Augue Ave'
        },
        {
            'id': 2,
            'name': 'Ila',
            'surname': 'Hensley',
            'birthDate': '04-12-1989',
            'mobile': '390735720',
            'address': 'Ap #994-6372 Feugiat St.'
        }
    ]
};

describe('DataTableController', function() {
    let $httpBackend: ng.IHttpBackendService,
        $controller: ng.IControllerService,
        DataTableController: IDataTableController,
        toaster: ngtoaster.IToasterService;

    beforeEach(module('app'));

    beforeEach(inject((_$controller_, _$httpBackend_, _toaster_) => {
        // Inject
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        toaster = _toaster_;

        // DataTableController will fetch data from users.json upon loading
        $httpBackend.expectGET('users.json').respond(200, mockData);
        DataTableController = $controller('DataTableCtrl');
        $httpBackend.flush();
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    // Proper tests
    it('should initialize correctly', () => {
        expect(DataTableController).toBeDefined();
    });

    it('should load user data', () => {
        expect(DataTableController.users).toBeDefined();

        DataTableController.users.forEach((user: IUserView, index: number) => {
            expect(user).toEqual(jasmine.objectContaining(mockData.users[index]));
        });
    });

    describe('user manipulation - ', () => {
        it('should remove users', () => {
            $httpBackend.expectPOST('http://users.impaqgroup.com/remove/1').respond(200);
            DataTableController.userRemove(0);
            $httpBackend.flush();

            expect(DataTableController.users.length).toBe(mockData.users.length - 1);
            expect(DataTableController.users).not.toContain(jasmine.objectContaining(mockData.users[0]));
        });

        it('should save users', () => {
            let mockUser = angular.extend({}, DataTableController.users[0]);
            mockUser.surname = 'testing';
            mockUser.frozen = true;
            DataTableController.users[0].surname = 'testing';

            $httpBackend.expectPOST('http://users.impaqgroup.com/edit/1', JSON.stringify(mockUser)).respond(200);
            DataTableController.userSave(0);
            $httpBackend.flush();
        });

        it('should freeze users when saving', () => {
            $httpBackend.expectPOST('http://users.impaqgroup.com/edit/1').respond(200);
            DataTableController.userSave(0);
            expect(DataTableController.users[0].frozen).toBe(true);
            $httpBackend.flush();
        });

        it('should freeze users when removing', () => {
            $httpBackend.expectPOST('http://users.impaqgroup.com/remove/1').respond(200);
            DataTableController.userRemove(0);
            expect(DataTableController.users[0].frozen).toBe(true);
            $httpBackend.flush();
        });
    });

    describe('error displaying - ', () => {
        beforeEach(() => {
            spyOn(toaster, 'error');
        });

        it('should display error when saving fails', () => {
            $httpBackend.expectPOST('http://users.impaqgroup.com/edit/1').respond(404);
            DataTableController.userSave(0);
            $httpBackend.flush();

            expect(toaster.error).toHaveBeenCalled();
        });

        it('should display error when removing fails', () => {
            $httpBackend.expectPOST('http://users.impaqgroup.com/remove/1').respond(404);
            DataTableController.userRemove(0);
            $httpBackend.flush();

            expect(toaster.error).toHaveBeenCalled();
        });
    });

    describe('multiple user selection - ', () => {
        
    });
});
