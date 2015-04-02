
angular.module('app').controller('LoginController',['$scope','UserService',function($scope,userService){

    $scope.login=function(){
        userService.login($scope.username,$scope.password, $scope.rememberMe).then(function(response){
             $scope.$emit('login',response.data);
        });
    }
}]);