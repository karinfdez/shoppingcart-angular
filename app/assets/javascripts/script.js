// var app=angular.module("pages",['ngRoute'])
// ngRoute for defining the routes, templates for using the gem on rails
//to call the templates inside the javascripts folder and ngResource to call $resource
var app=angular.module('pages',['ngRoute','templates'])


.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/home', {
      templateUrl: 'home.html',
      controller: 'MainCtrl',
      resolve:{
      'products':function(productService){
        return productService.Promise;
       }
      }
    }).
    
  
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
    
    when('/shopping', {
      templateUrl: 'shopping.html',
      controller: 'ShopCtrl'
    }).
     when('/product', {
      templateUrl: 'product.html',
      controller: 'proCtrl'
    }).
    // Automatically redirect to home page when page reload
    otherwise({redirectTo:'/home'})
}])


.controller('MainCtrl',[function(){
     console.log("This is the Main Controller");
}])


// Let me use this product later in multiple controllers

.factory('productService', function($http) {
 return{
    getProducts : function() {
        return $http({
            url: '/products.json',
            method: 'GET'
        })
    }
  }
})

.controller('proCtrl','productService'[function(productService){
      
      $http.get('/products/1.json')
        .success(function(data) {
          var carts = data; 
          if (Object.keys(carts).length === 0){
               $scope.message="Your cart is currently empty";
          }

        console.log("controller1",$scope.products);
      });
}])
.controller('product_controller',['$scope','productService', function ($scope,productService)  {
    
      productService.getProducts().success(function(data){
        $scope.products=data;
        console.log("controller1",$scope.products);
      });
      
}])


.controller('ShopCtrl',['$scope','$http', 'productService', function ($scope,$http,productService) {
    $scope.productsArray=[];
    $scope.total=0;
    $scope.totalPrice=0;
    productService.getProducts().success(function(data){
        var productCart=data;
         $http.get('/cart.json')
        .success(function(data) {
          var carts = data; 
          if (Object.keys(carts).length === 0){
               $scope.message="Your cart is currently empty";
          }
          else {
         for ( var key in carts) {
            productCart.forEach(function(product){
              if (product.id===parseInt(key)){
                $scope.productsArray.push({productTitle: product.title,productPrice: product.price* carts[key],productAmount: carts[key],productImage: product.image,cartId: key });
                $scope.totalPrice+=product.price* carts[key]
              }

             });
            $scope.total=$scope.total+carts[key];
          }
        }
         
        })

      });   
}]);






 