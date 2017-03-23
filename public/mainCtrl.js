angular.module('magicApp').controller('mainCtrl', function($scope, $state, mainServ){
  $scope.wrongpassword,
  $scope.nopasswordmatch,
  $scope.emailverified,
  $scope.passwordtime,
  $scope.registeraccount,
  $scope.loggedinuser;
  $scope.checkemail = function(email){
    $scope.emailtologin = email;
    mainServ.checkemail(email)
    .then(function(res){
      if(res){
        $scope.emailverified = true;
        $scope.passwordtime = true;
      } else {
        $scope.registeraccount = true;
      }
    });
  };
  $scope.login = function(password){
    var user = {
      email: $scope.emailtologin,
      password: password
    };
    mainServ.login(user)
    .then(function(res){
      if(res.status == 401){
        $scope.wrongpassword = true;
        $scope.loginpassword = "";
      } else {
        $scope.getMe();
        $state.go("profile");
      }
    })
  }
  $scope.register = function(registeruser){
    if(registeruser.password != $scope.password2){
      $scope.nopasswordmatch = true;
      $scope.registeruser.password = "";
      $scope.password2 = "";
    } else {
      registeruser.email = $scope.emailtologin;
      mainServ.login(registeruser)
      .then(function(res){
        $scope.getMe();
        $state.go('profile');
        $scope.emailverified = false;
      });
    }
  };
  $scope.getMe = function(){
    mainServ.getMe()
    .then(function(res){
      $scope.loggedinuser = res.data;
      console.log($scope.loggedinuser);

      $scope.emailverified = false;
    });
  };


});
