var app=angular.module("pages",['ngRoute'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/about', {
      templateUrl: 'about.html',
      controller: 'MainCtrl'
    }).
    when('/contact', {
      templateUrl: 'contact.html',
      controller: 'MainCtrl'
    })

    // otherwise({redirectTo:'/page/about'})
}])

.controller('MainCtrl',[function(){
     console.log("This is the Main Controller");
}]);