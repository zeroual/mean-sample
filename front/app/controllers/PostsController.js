    app.controller('PostsController',['$scope','PostsService',function ($scope, postsService) {
        $scope.addPost = function () {
            if ($scope.postBody) {
                postsService.save({
                    username: 'Snake',
                    body: $scope.postBody
                })
                    .success(function (post) {
                        //$scope.posts.unshift(post)
                        $scope.postBody = null
                    })
            }
        };
        postsService.fetch()
            .success(function (posts) {
                $scope.posts = posts
            })
        $scope.$on('ws:new_post',function(_,post){
                $scope.$apply(function(){
                    $scope.posts.unshift(post);
                });
        });
    }]);