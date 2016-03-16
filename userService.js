(function() {
  // to avaoid leaking of variables
  "use strict";

  angular.module('my_app')
    .service('userService', userService);
  userService.$inject = ['$http', '$q'];

  function userService($http, $q) {
    var self = this;
    self.update = false;
    self.currentIndex = 0;

    self.getUsers = function() {
      return $http.get('http://localhost:8080/SpringBasic3/api/users')
        .then(successFunction, errorFunction);
    };
  
    self.getUserId = function(data)
    {
      console.log('http://localhost:8080/SpringBasic3/api/userId/'+data.password);
       return $http.get('http://localhost:8080/SpringBasic3/api/userId/'+data.password)
        .then(successFunction, errorFunction);
    };
    self.getMovie = function()
    {
      return $http.get('http://localhost:8080/SpringBasic3/api/movies')
        .then(successFunction, errorFunction);
    };

    // problem here
    self.addUsers = function(user) {
      return $http.post('http://localhost:8080/SpringBasic3/api/users', user)
        .then(successFunction, errorFunction);

    };
    self.getWishListId = function(data)
    {
      console.log('http://localhost:8080/SpringBasic3/api/wishlistId/'+data.userId);
       return $http.get('http://localhost:8080/SpringBasic3/api/wishlistId/'+data.userId)
        .then(successFunction, errorFunction);

    };
    self.addWishList = function(data)
    {
      return $http.post('http://localhost:8080/SpringBasic3/api/wishlist', data)
        .then(successFunction, errorFunction);

    };
    
    self.addMovie =  function(movie) {
      return $http.post('http://localhost:8080/SpringBasic3/api/movies', movie)
        .then(successFunction, errorFunction);

    };
    
    self.addOrder=function(data)
    {
      return $http.post('http://localhost:8080/SpringBasic3/api/order', data)
      .then(successFunction,errorFunction)
      
    }
    
    self.getOrderById=function(data){
      
      return $http.get('http://localhost:8080/SpringBasic3/api/order/' +data.userID)
      .then(successFunction, errorFunction);
      
    }
    
    
    self.deleteUsers = function(userid) {
      console.log('Link is : http://localhost:8080/SpringBasic3/api/users/' + userid);
      return $http.delete('http://localhost:8080/SpringBasic3/api/users/' + userid)
        .then(successFunction, errorFunction);

    };

    self.updateUsers = function(userId,user) {
      console.log('.updateUsers function called as:  '+userId+' : '+user);
      return $http.put('http://localhost:8080/SpringBasic3/api/users/'+userId,user)
        .then(successFunction, errorFunction);

    };
    
     self.CancelALLmyOrders=function(data){
      console.log('http://localhost:8080/SpringBasic3/api/order/' +data.userID);
      return $http.delete('http://localhost:8080/SpringBasic3/api/order/' +data.userID)
      .then(successFunction, errorFunction);
      
    }
    
    
    
    // if success
    function successFunction(response) {
      return response.data;
    }
    // if erro
    function errorFunction(errorResponse) {
      console.log(errorResponse.status);
      // to reject the call
      $q.reject(errorResponse.status);
    }


  }

})();