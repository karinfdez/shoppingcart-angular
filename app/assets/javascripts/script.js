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
      when('/shopping', {
      templateUrl: 'shopping.html',
      controller: 'ShopCtrl'
    }).
    // Automatically redirect to home page when page reload
    otherwise({redirectTo:'/home'})
}])


.controller('MainCtrl',[function(){
     console.log("This is the Main Controller");
}])



.controller('product_controller',['$scope','$http','$rootScope', function ($scope,$http,$rootScope)  {
    $http.get('/products')
        .success(function(data) {
          $scope.products = data;
          $rootScope.shareProduct=data;
          console.log("first variable")
          console.log($rootScope.shareProduct);
         
        })
        .error(function(data) {
          console.log("Error getting data");
    });
      
}])


.controller('ShopCtrl',['$scope','$http', '$rootScope', function ($scope,$http,$rootScope) {
       console.log("test")
        $scope.myProduct=$rootScope.shareProduct
        console.log($scope.myProduct);
      $http.get('/cart')
        .success(function(data) {
          $scope.carts = data;
          $scope.total=0;
          for (var key in $scope.carts){
            $scope.total=$scope.total+$scope.carts[key];
            
          }
        
          
      })
        .error(function(data) {
          console.log("Error getting cart data");
    });
}]);






 