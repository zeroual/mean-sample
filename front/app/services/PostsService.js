app.service('PostsService',['$http',function ($http) {
    this.fetch = function () {
        return $http.get('/api/posts')
    };
    this.save = function (post) {
        return $http.post('/api/posts', post)
    }
}]);