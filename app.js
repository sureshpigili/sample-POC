var app = angular.module('searchApp', []);

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

app.controller('searchController',['$http', '$log', 'getDataService', function ( $http, $log, getDataService) {

    var searchCtrl = this;
    getDataService.async().then(function (data) {
        searchCtrl.playerList = data.Players;
    });
}]);


app.factory('getDataService', ['$http','$log',function ($http,$log) {
    var getDataService = {
        async: function () {
            var promise = $http.get('resources/items.json').then(function (response) {
                $log.debug(response);
                return response.data;
            },function (error) {
                $log.debug(error);
            });
            return promise;
        }
    };
    return getDataService;
}]);
