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
    // Automatically redirect to home page when page reload
    otherwise({redirectTo:'/home'})
}])


.controller('MainCtrl',[function(){
     console.log("This is the Main Controller");
}])


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



//     function(){
//     $http.get('/products')
//     .success(function(data) {
//      $scope.data = data;  
//      // return $scope.data;
//     });
//   }
// }
// }])

// .factory('productService',['$scope','$http', function($scope,$http) {
//    $http.get('/products')
//     .success(function(data) {
//     $scope.data = data;  
//     console.log( $scope.data);
//   });
//    console.log("Test",$scope.data);
//   return {$scope.data};

// }])

// controllers. = function($scope, $location, $http, photosFactory) {
//     $scope.photos = [];
//    photosFactory.getPhotos().success(function(data){
//    $scope.photos=data;
//    });
// }

.controller('product_controller',['$scope','productService', function ($scope,productService)  {
    
      productService.getProducts().success(function(data){
        $scope.products=data;
        console.log("controller1",$scope.products);
      });
      
}])


.controller('ShopCtrl',['$scope','$http', 'productService', function ($scope,$http,productService) {
    $scope.productsArray=[];
    productService.getProducts().success(function(data){
        $scope.productCart=data;
        // console.log("controller2", $scope.productCart);
         $http.get('/cart.json')
        .success(function(data) {
          $scope.carts = data; 
          // console.log(Object.keys($scope.carts).length );
          // console.log("bey",$scope.carts);
         for ( var key in $scope.carts) {
            $scope.productCart.forEach(function(product){
              // console.log("cartId",key);
              //  console.log("product",product.id);
              if (product.id===parseInt(key)){
               
                $scope.productsArray.push({productTitle: product.title,productPrice: product.price,productAmount: $scope.carts[key],productImage: product.image});
                  
              }

             });
          };
         
        });

      });   
}]);






 