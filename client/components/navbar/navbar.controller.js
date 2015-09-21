'use strict';

angular.module('meanApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, ModalService) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    function doShowModal(controllerObj, callback) {
      ModalService.showModal(controllerObj)
        .then(function(modal) {
          modal.element.modal();
          modal.close.then(function(result) {
            $('.modal-backdrop').remove();
            if(typeof callback === 'function') {
              callback(result);
            }
        });
      }).catch(function(error) {
          // error contains a detailed error message.
          console.log("Error:", error);
      });
    }

    // Display login modal
    $scope.doLogin = function() {
      doShowModal({
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      }, function(result) {
        if(result === 'signup') {
          $scope.doSignup();
        }
      });
    };

    // Display Signup Modal
    $scope.doSignup = function() {
      doShowModal({
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      }, function(result) {
        if(result === 'login') {
          $scope.doLogin();
        }
      });
    };

  });
