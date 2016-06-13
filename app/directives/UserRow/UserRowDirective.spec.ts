/// <reference path="../../../typings/main.d.ts" />
import { IUserView } from '../../User.ts';
import { IUserRowDirectiveExtendedScope } from './UserRowDirective.d.ts';

describe('UserRowDirective', function() {
    beforeEach(module('app'));

    let $compile: ng.ICompileService,
        $rootScope: ng.IRootScopeService,
        scope: IUserRowDirectiveExtendedScope,
        isolatedScope: IUserRowDirectiveExtendedScope,
        directiveElement;

    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = <IUserRowDirectiveExtendedScope>$rootScope.$new();

        // Initialize user and other methods that need to be passed to the scope
        scope.user = {
            address: 'Sample Street 10',
            birthDate: '13-06-2016',
            edited: false,
            frozen: false,
            id: 1,
            mobile: '123456789',
            name: 'John',
            selected: false,
            surname: 'Smith'
        };
        scope.vm = {
            userRemove: () => { /* */ },
            userSave: () => { /* */ }
        };
        /*scope.vm.userRemove = () => { /!* *!/ };
        scope.vm.userSave = () => { /!* *!/ };*/

        // Compile the directive
        let element = angular.element('<tr user-row user="user" remove="vm.userRemove($index)" save="vm.userSave($index)"></tr>');
        directiveElement = $compile(element)(scope);
        scope.$digest();

        isolatedScope = directiveElement.isolateScope();
    }));

    it('should instantiate properly', () => {
        expect(directiveElement).toBeDefined();

    });

    it('should add it\'s own methods to the scope', () => {
        expect(isolatedScope.cancelEdit).toBeDefined();
        expect(isolatedScope.createBackup).toBeDefined();
        expect(isolatedScope.remove).toBeDefined();
        expect(isolatedScope.save).toBeDefined();
    });

    it('should copy the user', () => {
        expect(isolatedScope.user).toEqual(scope.user);
    });

    describe('non-editing view', () => {
        beforeEach(() => {
            isolatedScope.user.edited = false;
            isolatedScope.$digest();
        });

        it('should display user\'s name', () => {
            const nameSpan = directiveElement.find('span')[0];
            expect(nameSpan.innerHTML).toContain(scope.user.name);
        });

        it('should enable clicking the buttons', () => {
            const buttons = directiveElement.find('button');
            expect(buttons[0].disabled).toBe(false);    // Edit button
            expect(buttons[1].disabled).toBe(false);    // Remove button
        });
    });

    describe('editing view', () => {
        beforeEach(() => {
            isolatedScope.user.edited = true;
            isolatedScope.$digest();
        });

        it('should display an input with user\s name inside', () => {
            const nameInput = directiveElement.find('input')[1];
            expect(nameInput.value).toEqual(scope.user.name);
        });

        it('should disable the input when user is frozen', () => {
            isolatedScope.user.frozen = true;
            isolatedScope.$digest();

            const nameInput = directiveElement.find('input')[1];
            expect(nameInput.disabled).toEqual(true);
        });
    });
});
