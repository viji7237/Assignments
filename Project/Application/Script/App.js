
var app = angular.module("ETApp", ['ETServices', 'ngCookies', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/',
        {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        }
    ).when('/home',
        {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        }
    ).when('/login',
        {
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        }
    ).when('/templates',
        {
            templateUrl: 'templates.html',
            controller: 'TemplateListCtrl'
        }
    ).when('/template/:id',
        {
            templateUrl: 'template.html',
            controller: 'TemplateCtrl'
        }
    ).when('/contact',
        {
            templateUrl: 'ContactUs.html',
            controller: 'ContactCtrl'
        }
    ).when('/about',
        {
            templateUrl: 'AboutUs.html',
            controller: 'AboutCtrl'
        }
    );
});


