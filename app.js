var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

app.controller('MainCtrl', [
           '$scope', 'postService',
  function ($scope,   postService) {

    $scope.test = 'Hellow world!';

    $scope.posts = postService.posts;

    $scope.addPost = function () {
      if(!$scope.title) {
        return;
      }
      postService.create({
        title: $scope.title,
        link: $scope.link
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      postService.upvote(post);
    };

  }
]);

app.controller('PostCtrl', [
  '$scope',
  'postService',
  'post',
  function($scope, postService, post){
    $scope.post = post;
    
    $scope.addComment = function(){
      if(!$scope.body) {
        return;
      }
      postService.addComment(post._id, {
        body: $scope.body,
        author: 'user',        
      }).success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };
    
    $scope.incrementUpvotes = function(comment){
      postService.upvoteComment(post, comment);
    };
    
  }
]);