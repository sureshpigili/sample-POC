
describe("Testing the Web app",function(){

    var scope, controller, httpbackend, log;

    beforeEach(function(){
        module('searchApp');
    });

    beforeEach(inject(function($rootScope,$controller,$httpBackend,$log){

        scope = $rootScope.$new();
        httpbackend = $httpBackend;
        log = $log;
        spyOn(log,'debug');

        controller = $controller('searchController',{$scope: scope, $log : log});
    }));


    it("Testing the Controller",function(){

        httpbackend.expectGET('resources/items.json').respond(201,{Players:['a','b']});
        scope.$apply();

        expect(controller).toBeDefined();
        httpbackend.flush();

        scope.$apply();
        expect(scope.playerList).toEqual(['a','b']);

        expect(log.debug).toHaveBeenCalledWith(['a','b']);
    });



});