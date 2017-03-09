angular.module('magicApp',['ui.router']).config(function($urlRouterProvider, $stateProvider){
  $stateProvider.state('home',{
      url: '/',
      templateUrl: './views/home.html'
    }).state('login',{
        url: '/login',
        templateUrl: './views/login.html'
    }).state('profile',{
        url: '/profile',
        templateUrl: './views/profile.html'
    }).state('calendar',{
        url: '/calendar',
        templateUrl: './views/calendar.html'
    });

    $urlRouterProvider.otherwise('/');
});
