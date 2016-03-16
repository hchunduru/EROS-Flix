(function() {
  // to avaoid leaking of variables
  "use strict";

  angular.module('my_app').
  controller('mainController', mainController)
  .config(function($httpProvider) {
  /**
   * make delete type json
   */
  $httpProvider.defaults.headers["delete"] = {
    'Content-Type': 'application/json;charset=utf-8'
  };
});
  //$http inject can be done
  mainController.$inject = ['userService'];

  function mainController(userService) {

    var mainVar = this;
    mainVar.update = false;
    mainVar.updateMovie = false;
    mainVar.currentIndex = 0;
    mainVar.template = 'MovieTemplate.html';
    console.log('User object values: ' + userService.getUsers());
   
    userService.getUsers()
      .then(function(UserData) {

          mainVar.users = UserData;
          console.log('Success to fecth the data from service ' + self.users);
        },
        function(error) {
          console.log(error);
        });
     userService.getMovie()
      .then(function(MovieData) {

          mainVar.movies = MovieData;
          console.log('Success to fecth the data from service ' + self.users);
        },
        function(error) {
          console.log(error);
        });

    mainVar.submit = function() {
        console.log('Enter Submit');
        if (!mainVar.update) {
          console.log('Call to add User');
          mainVar.addUser();
        } else {
          console.log('Call to Update User');
          mainVar.updateUser();
        }

      };
    mainVar.submitWislist = function()
    {
    console.dir(mainVar.newWish);  
     mainVar.addWishList(mainVar.newWish); 
    };
    
  
    mainVar.submitWislist1 = function()
    {
      console.dir(mainVar.newWish2);
      mainVar.getWishListId(mainVar.newWish2);
    };
    
     mainVar.getWishListId = function(data)
    {
      console.dir(data);
      userService.getWishListId(data)
      .then(function(data) {

          mainVar.wislist2 = data;
          console.log('Success to fecth the data from service ' + self.users);
        },
        function(error) {
          console.log(error);
        });
    };
    
      mainVar.submitOrder=function(){
      console.dir(mainVar.newOrder);
      mainVar.addOrder(mainVar.newOrder);
      
    };
    
    mainVar.submitOrder1=function(){
      console.dir(mainVar.newOrder2)
      mainVar.getOrderByID(mainVar.newOrder2);
    };
    

    
    mainVar.addWishList = function(data)
    {
       console.dir(data);
       console.log('data is ; '+data);
     userService.addWishList(data)
     .then(function(data) {
          console.log(data);
          mainVar.wislist  = data;
          console.log('Success to fecth the data from service ' + data);
        },
        function(error) {
          console.log(error);
        });
    };
    
     mainVar.submitOrder=function(){
      console.dir(mainVar.newOrder);
      mainVar.addOrder(mainVar.newOrder);
      
    };
    
    mainVar.submitOrder1=function(){
      console.dir(mainVar.newOrder2)
      mainVar.getOrderByID(mainVar.newOrder2);
    };
    
     mainVar.submitCancel=function(){
      console.dir(mainVar.newOrder3)
      mainVar.CancelALLmyOrders(mainVar.newOrder3);
    }; 
    
   mainVar.addOrder = function(data)
    {
       console.dir(data);
       console.log('data is ; '+data);
     userService.addOrder(data)
     .then(function(data) {
          console.log(data);
          mainVar.OrderList = data;
          console.log('Success to fecth the data from service ' + data);
        },
        function(error) {
          console.log(error);
        });
    };
    mainVar.CancelALLmyOrders = function(data)
    {
       console.dir(data);
       console.log('data is ; '+data);
     userService.CancelALLmyOrders(data)
     .then(function(data) {
          console.log(data);
          mainVar.OrderList = data;
          console.log('Success to fecth the data from service ' + data);
        },
        function(error) {
          console.log(error);
        });
    };
       mainVar.getOrderByID = function(data)
    {
      console.dir(data);
      userService.getOrderById(data)
      .then(function(data) {

          mainVar.OrderList2 = data;
          console.log('Success to fecth the data from service ' + self.users);
        },
        function(error) {
          console.log(error);
        });
    };
   mainVar.submitMovie = function() {
        console.log('Enter Submit');
        if (!mainVar.updateMovie) {
          console.log('Call to add User');
          mainVar.addMovie();
        } else {
          console.log('Call to Update User');
          mainVar.updateUser();
        }

      }
      mainVar.submitUserId = function()
      {
        mainVar.getUserId(mainVar.newUser1);
        
      };
      mainVar.getUserId = function(data)
      {
        userService.getUserId(data)
        .then(function(data) {
          console.dir(data);
          mainVar.usersFiler = data;
          console.log('Success to fecth the data from service ' + self.users);
        },
        function(error) {
          console.log(error);
        });
      };
      // add movie
      mainVar.addMovie = function() {

        //console.log(mainVar.newUser.list_Title+'  '+mainVar.newUser.list_Actors);
        mainVar.movies.push(mainVar.newMovie);
        userService.addMovie(mainVar.newMovie)
          .then(function(data) {

            // mainVar.users = UserData;
            console.log('Success to fecth the data from service ' + data.list_Actors);
            return userService.getMovie();

          })
          .then(function(data) {

            //mainVar.users = UserData;
            console.log('Success to fecth the data from service ' + self.users);
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log('Addede Movie:  ' + mainVar.newMovie);
        mainVar.newUser = null;
      }
      
      // to add  a new User
    mainVar.addUser = function() {

        
        mainVar.users.push(mainVar.newUser);
        userService.addUsers(mainVar.newUser)
          .then(function(data) {

            // mainVar.users = UserData;
            console.log('Success to fecth the data from service ' + self.users);
            return userService.getUsers();

          })
          .then(function(data) {

            //mainVar.users = UserData;
            console.log('Success to fecth the data from service ' + self.users);
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log('Addede user:  ' + mainVar.newUser);
        mainVar.newUser = null;
      }
      // To edit a new User
    mainVar.edit = function(userId,user) {
      console.log('Entered edit function'+userId+' '+user.fname);
      mainVar.update = true;
      mainVar.newUser = mainVar.users[userId];
      mainVar.currentIndex = userId;

    }

    mainVar.updateUser = function() {
      console.log('Entered update  function');
      mainVar.users.splice(mainVar.currentIndex, 1);
      mainVar.users.splice(mainVar.currentIndex, 0, mainVar.newUser);
      console.log('Updated user :  ' + mainVar.newUser + " " + mainVar.currentIndex + '  '+mainVar.users[mainVar.currentIndex]);
      
      
        userService.updateUsers(mainVar.currentIndex,mainVar.users[mainVar.currentIndex])
        .then(function(data) {
          // mainVar.users = UserData;
          console.log('Success to fecth the data from service ' + self.users);
          return userService.getUsers();

        })
        .then(function(data) {

          mainVar.users = data;
          console.log('Success to fecth the data from service ' + self.users);
        })
        .catch(function(error) {
          console.log(error);
        });
      mainVar.update = false;
      mainVar.currentIndex = 0;
      mainVar.newUser = null;
    }



    // to delte a existing User
    mainVar.delete = function(userId) {
      console.log('Delete User: '+userId);
      mainVar.users.splice(userId, 1);
      userService.deleteUsers(userId)
        .then(function(data) {
          // mainVar.users = UserData;
          console.log('Controller entered to delete: ' + self.users);
          return userService.getUsers();

        })
        .then(function(data) {

          mainVar.users = data;
          console.log('Controller entered to delete:  ' + self.users);
        })
        .catch(function(error) {
          console.log(error);
        });
    }


  }
})();