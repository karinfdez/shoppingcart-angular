// var app=angular.module("pages",['ngRoute'])
// ngRoute for defining the routes, templates for using the gem on rails
//to call the templates inside the javascripts folder and ngResource to call $resource
var app=angular.module('pages',['ngRoute','templates'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/about', {
      templateUrl: 'about.html',
      controller: 'MainCtrl'
    }).
    when('/contact', {
      templateUrl: 'contact.html',
      controller: 'MainCtrl'
    }).
    when('/products', {
      templateUrl: 'products_list.html',
      controller: 'product_controller'
    }).
     when('/home', {
      templateUrl: 'home.html',
      controller: 'MainCtrl'
    }).
    otherwise({redirectTo:'/'})
}])


.controller('MainCtrl',[function(){
     console.log("This is the Main Controller");
}])

// Get request from products page
.controller('product_controller', ['$scope','$http', function ($scope, $http) {
    $http.get('/products')
        .success(function(data) {
          $scope.products = data;
          console.log($scope.products);
          
        })
        .error(function(data) {
          console.log("Error getting data");
    });
}]);




 