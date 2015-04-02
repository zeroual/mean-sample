    angular.module('app').controller('ApplicationController',
        ['$scope','$http','$location','UserService','$window',
            function($scope,$http,$location,userService,$window){

                if($window.localStorage.token){
                    userService.token=$window.localStorage.token;
                    userService.getUser().then(function(response){
                        $http.defaults.headers.common['X-Auth']=svc.token;
                        $scope.currentUser=response.data;
                    });
                }

        $scope.$on('login',function(_,user){
           $scope.currentUser=user;
        });

        $scope.logout=function() {
            $scope.currentUser=null;
            $http.defaults.headers.common['X-Auth']=undefined;
        }

    }]);