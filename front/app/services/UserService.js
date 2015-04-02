angular.module('app').service('UserService',['$http','$window',function($http,$window){

    svc=this;

    svc.getUser=function(){
        return $http.get('api/users',
            {
              headers:{"X-Auth":svc.token}
            }
        );
    };

    svc.login=function(username,password,rememberMe){
       return $http.post('/api/sessions',{"username":username,"password":password}).then(function(res){
            svc.token=res.data;
            $http.defaults.headers.common['X-Auth']=svc.token;
            if(rememberMe){
                $window.localStorage.token=svc.token;
            }
            return svc.getUser();
        });
    };

    svc.register=function(username,password){
        return $http.post('/api/users',{'username':username,'password':password});
    }

}]);