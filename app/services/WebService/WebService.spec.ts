/// <reference path="../../../typings/main.d.ts" />
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

describe('WebService tests', function() {
    let $httpBackend: ng.IHttpBackendService,
        WebService;

    beforeEach(module('app'));

    beforeEach(() => {
        inject((_$httpBackend_, _WebService_) => {
            $httpBackend = _$httpBackend_;
            WebService = _WebService_;
        });
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should initialize correctly', () => {
        expect(WebService).toBeDefined();
    });

    it('should fetch initial data', (done) => {
        $httpBackend.expectGET('users.json').respond(200, mockData);

        WebService.fetchInitialData().then(response => {
            expect(JSON.stringify(response.data)).toEqual(JSON.stringify(mockData));
            setTimeout(done, 0);    // make sure $digest from $httpBackend.flush is complete before exiting
        });
        $httpBackend.flush();
    }, 5000);

    it('should send a proper edit request', (done) => {
        $httpBackend.expectPOST('http://users.impaqgroup.com/edit/1').respond(200);
        let user = {
            address: 'Woloska 22',
            birthDate: '02-12-1936',
            id: 1,
            mobile: '123456789',
            name: 'Lorem',
            surname: 'Ipsum',
        };

        WebService.edit(user).then(response => {
            expect(response.status).toEqual(200);
            setTimeout(done, 0);    // make sure $digest from $httpBackend.flush is complete before exiting
        });
        $httpBackend.flush();
    }, 5000);

    it('should send a proper remove request', (done) => {
        $httpBackend.expectPOST('http://users.impaqgroup.com/remove/1').respond(200);
        let user = {
            address: 'Woloska 22',
            birthDate: '02-12-1936',
            id: 1,
            mobile: '123456789',
            name: 'Lorem',
            surname: 'Ipsum',
        };

        WebService.remove(user).then(response => {
            expect(response.status).toEqual(200);
            setTimeout(done, 0);    // make sure $digest from $httpBackend.flush is complete before exiting
        });
        $httpBackend.flush();
    }, 5000);
});
