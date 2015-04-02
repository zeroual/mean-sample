var app = angular.module('app', [
    'ngRoute'
]);
app.config(['$routeProvider',function($routeProvider){

    $routeProvider.when('/',{
        templateUrl:'views/posts.html',
        controller:'PostsController'
    }).when('/register',{
        templateUrl:'views/register.html',
        controller:'RegisterController'
    }).when('/login',{
        templateUrl:'views/login.html',
        controller:'LoginController'
    });
}]);