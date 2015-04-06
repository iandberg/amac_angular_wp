// initialize the app
var myapp = angular.module('myapp', ['ui.router','ngSanitize','ngAnimate']);

// set the configuration
myapp.run(['$rootScope', function($rootScope){
  // the following data is fetched from the JavaScript variables created by wp_localize_script(), and stored in the Angular rootScope
  $rootScope.dir = BlogInfo.url;
  $rootScope.site = BlogInfo.site;
  $rootScope.api = AppAPI.url;
  $rootScope.partials = BlogInfo.url + 'partials/';
}]);


myapp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");
  $urlRouterProvider.when('/schedule','/schedule/schedule');

  $stateProvider
	.state('home', {
	  url: "/home",
	  templateUrl: BlogInfo.partials + "home.html",
	  controller: 'MainController',
	})
	.state('schedule', {
	  url: "/schedule",
	  templateUrl: BlogInfo.partials + "schedule.html",
	  controller: 'MainController',
	})
	.state('schedule.schedule', {
	  url: "/schedule",
	  templateUrl: BlogInfo.partials + "schedule.page.html",
	  controller: 'ProgramsController',
	})
	.state('schedule.special-events', {
	  url: "/special-events",
	  templateUrl: BlogInfo.partials + "schedule.page.html",
	  controller: 'ProgramsController',
	})
	.state('schedule.rates', {
	  url: "/rates",
	  templateUrl: BlogInfo.partials + "schedule.page.html",
	  controller: 'ProgramsController',
	})
	.state('shop', {
	  url: "/shop",
	  templateUrl: BlogInfo.partials + "shop.html",
	  controller: 'MainController',
	})
	.state('programs', {
	  url: "/programs",
	  templateUrl: BlogInfo.partials + "programs.html",
	  controller: 'MainController',
	})
	.state('programs.kung-fu', {
	  url: "/kung-fu",
	  templateUrl: BlogInfo.partials + "programs.page.html",
	  controller: 'ProgramsController',
	})
	.state('programs.tai-chi', {
	  url: "/tai-chi",
	  templateUrl: BlogInfo.partials + "programs.page.html",
	  controller: 'ProgramsController',
	})
	.state('programs.kids-classes', {
	  url: "/kids-classes",
	  templateUrl: BlogInfo.partials + "programs.page.html",
	  controller: 'ProgramsController',
	})
	.state('programs.private-lessons', {
	  url: "/private-lessons",
	  templateUrl: BlogInfo.partials + "programs.page.html",
	  controller: 'ProgramsController',
	})
});

myapp.factory('getPage',function ($http, $rootScope) {
	return function (id) {
// 		return $http.get($rootScope.api+'/wp-json/posts/' + id); // we fetch the page id via url
		return $http.get($rootScope.api+'/wp-json/posts?type[]=page&filter[pagename]=' + id); // we fetch the page id via url
	}
});
myapp.factory('getFeaturedPost',function ($http, $rootScope) {
	return $http.get($rootScope.api+'/wp-json/posts?filter[posts_per_page]=1&filter[category_name]=featured'); // we fetch the page id via url
});

myapp.controller('MainController', ['$scope', 'getPage', 'getFeaturedPost', '$location', '$sce', '$state', function($scope, getPage, getFeaturedPost, $location, $sce, $state) {

// 	$scope.routes = { //a mapping of url to post/page ids in wordpress
// 		'/home': 4,
// 		'/programs': 17,
// 		'/programs/kung-fu': 7,
// 		'/programs/tai-chi': 10,
// 		'/programs/kids-classes': 13,
// 		'/programs/private-lessons': 72,
// 		'/schedule': 19,
// 		'/schedule/schedule': 49,
// 		'/schedule/special': 47,
// 		'/schedule/rates': 45,
// 	 };

	//get the content from wp
	getPage($location.url()).then(function (resp) {

		$scope.content = $sce.trustAsHtml(resp.data[0].content); //we don't scan for anything, so the slideshow can work
	},function (error) {
		console.log('error: ', error.data);
	})
	
	getFeaturedPost.then(function (resp) {
		$scope.feat_post = {};
		$scope.feat_post.title = $sce.trustAsHtml(resp.data[0].title); //post title
		$scope.feat_post.content = $sce.trustAsHtml(resp.data[0].content); //we don't scan for anything, so the slideshow can work
		$scope.feat_post.img_url = $sce.trustAsHtml(resp.data[0].featured_image.guid); // featured image
	},function (error) {
		console.log('error: ', error.data);
	})
	
	$scope.fist = {};
	
	var fistClass = function () {
		var statename = $state.current.name;
		statename = statename.substring(statename.indexOf('.') + 1);
		$scope.fist.active = statename; //add the statename as a class to the fist
	}
	
	fistClass(); //on first load
	$scope.$on('$locationChangeStart', function () {
		fistClass();
	});
}]);

myapp.controller('ProgramsController', ['$scope', 'getPage', '$location', '$sce', '$state', function($scope, getPage, $location, $sce, $state) {
	getPage($location.url()).then(function (resp) {
		$scope.content = $sce.trustAsHtml(resp.data[0].content); //we don't scan for anything, so the slideshow can work
	},function (error) {
		console.log('error: ', error.data);
	})

}])
