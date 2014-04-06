"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });

      $routeProvider.when('/chat', {
         authRequired: false,
		 templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });

      $routeProvider.when('/mainpage', {
         authRequired: false, // must authenticate before viewing this page
         templateUrl: 'partials/mainpage.html',
         controller: 'MainPageCtrl'
      });

      $routeProvider.when('/original', {
         authRequired: false,
		 templateUrl: 'partials/original.html',
         controller: 'OriginalCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);