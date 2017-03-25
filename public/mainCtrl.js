angular.module('magicApp').controller('mainCtrl', function($scope, $state, mainServ){
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
        $state.go("profile");
        $scope.getMe();
      }
    });
  };
  $scope.register = function(registeruser, p2){
    if(registeruser.password != p2){
      $scope.nopasswordmatch = true;
      $scope.password2 = "";
    } else {
      registeruser.email = $scope.emailtologin;
      mainServ.login(registeruser)
      .then(function(res){
        $state.go('profile');
        $scope.getMe();
        $scope.emailverified = false;
      });
    }
  };
  $scope.getMe = function(){
    mainServ.getMe()
    .then(function(res){
      $scope.loggedinuser = res.data;
      $scope.emailverified = false;
    });
  };
  $scope.funstart = function(){
    document.getElementById('homelogo').style.transform = "rotate(360deg)";
    document.getElementById('homelogo').style.transition = "transform 1s linear";
    setTimeout(function(){
      $state.go('login');
    },1000);
  };
});
