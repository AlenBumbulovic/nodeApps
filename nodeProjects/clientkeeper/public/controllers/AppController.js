var myApp = angular.module('myApp', []);

myApp.controller('AppController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $http.get('/clients').success(function (response) {
        console.log('data recived from the server');
        $scope.clients = response;
    });

    $scope.addClient = function() {
       console.log('adding new client');
       $http.post('/clients', $scope.client).success(function (response) {
           console.log('client added');
           window.location.href = '/';
       });
    }

    $scope.editClient = function(id){
        $('#addBtn').remove();
        $http.get('/clients/'+id).success(function(response){
            $scope.client = response;
        });
    }

    $scope.updateClient = function(id){
        $http.put('/clients/'+$scope.client._id, $scope.client).success(function(response){
            console.log('client updated');
            window.location.href='/';
        });
    }

    $scope.deleteClient = function(id){
        $http.delete('/clients/'+id).success(function(response){
            console.log('client removed');
            window.location.href = '/';
        });
    }
}]);