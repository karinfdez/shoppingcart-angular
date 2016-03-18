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
      'products':function(ProductService){
        return ProductService.Promise;
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
      controller: 'product_list_controller'
    }).
    
    when('/shopping', {
      templateUrl: 'shopping.html',
      controller: 'ShopCtrl'
    }).
    
    //  when('/product', {
    //   templateUrl: 'product.html',
    //   controller: 'proCtrl'
    // }).
    when('/product/:id', {
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

.factory('ProductService',['$http', '$q',function($http, $q) {
 return{
    getProducts : function() {
        return $http({
            url: '/products.json',
            method: 'GET'
        })
    },
    getProductDetails: function (argument) {
      // console.log(argument);
        var url = '/products/' + argument;
        var defered = $q.defer();

        $http.get(url).then(
          function(response) {
            defered.resolve(response);
          },
          function(error){
            defered.reject(error);
            // console.log(error);
          }
        );

        return defered.promise;
    }
  }
}])

// Here I'm getting the id pass it in the view
.controller('proCtrl',['$http','$scope', '$routeParams', 'ProductService' ,function($http, $scope, $routeParams, ProductService){
    // console.log($routeParams);

    var product = $routeParams;

    getDetails();

    function getDetails(){
      ProductService.getProductDetails(product.id).then(
        function(response){
          $scope.specificProd = response.data;
        },
        function(error){
          console.log(error)
        }
      ); 
    }
     
}])

.controller('product_list_controller',['$scope','ProductService', function ($scope,ProductService)  {
      
      $scope.clickEvent = clickEvent;
      function clickEvent(id){
        $scope.myid=id;
      }

      ProductService.getProducts().success(function(data){
        $scope.products=data;
      });
      
}])


.controller('ShopCtrl',['$scope','$http', 'ProductService', function ($scope,$http,ProductService) {
    $scope.productsArray=[];
    $scope.total=0;
    $scope.totalPrice=0;
    $scope.count=0;
    // var productId=$routeParams;
    // console.log("id",productId);
    ProductService.getProducts().success(function(data){
        var productCart=data;
         $http.get('/cart.json')
        .success(function(data) {
          var carts = data; 
            if (Object.keys(carts).length === 0){
                 $scope.message="Your cart is currently empty";
            }
            else {
              console.log("this cart",carts);
                for ( var key in carts) {

                  productCart.forEach(function(product){
                    if (product.id===parseInt(key)){
                      $scope.totalPrice+=product.price * carts[key]
                      var count=carts[product.id];
                       $scope.productsArray.push({id:product.id,title:product.title,image:product.image,price:product.price,amount:count});
                      console.log("count",$scope.count);
                    }
                   
                  });
                  console.log("tax",$scope.totalTax);
                  $scope.total=$scope.total+carts[key];
                  // console.log("array of products",$scope.productsArray);
                }
            }
         
        });
      });
}]);






 