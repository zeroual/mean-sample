angular.module('app').controller('RegisterController',['$scope','$location','UserService',function($scope,$location,userService){

    $scope.register=function(){
        if($scope.username && $scope.password){
            userService.register($scope.username,$scope.password).then(function(response){
                $location.path('/login');
            });
        }
    }
}]);