angular.module('magicApp').controller('mainCtrl', function($scope, $state, mainServ){
  $scope.emailtologin = "",
  $scope.emailverified = false,
  $scope.loginemail = "",
  $scope.loggedin = false,
  $scope.loggedinuser =  {
    firstname: "Nick",
    lastname: "Marucci",
    email: "npm1514@gmail.com",
    meetings: [1,2,44,4,5,6,54]
  },
  $scope.loginpassword = "",
  $scope.nopasswordmatch = false,
  $scope.password2 = "",
  $scope.passwordtime = false,
  $scope.registeraccount = false,
  $scope.registeruser = {
    firstname: "",
    lastname: "",
    password: ""
  },
  $scope.wrongpassword = false;

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
      } else {
        $scope.wrongpassword = false;
        $scope.loggedin = true;
        $scope.emailverified = false;
        $scope.passwordtime = false;
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
        $scope.loggedin = true;
        $scope.emailverified = false;
        $scope.passwordtime = false;
        $scope.getMe();
        $scope.emailverified = false;
      });
    }
  };
  $scope.getMe = function(){
    mainServ.getMe()
    .then(function(res){
      console.log(res);
      $scope.loggedinuser = res.data;
      $scope.emailverified = false;
    });
  };
  $scope.logout = function(){
    mainServ.logout()
    .then(function(){
      $scope.loggedin = false;
      $state.go('home');
    })
  }
  $scope.funstart = function(){
    document.getElementById('homelogo').style.transform = "rotate(360deg)";
    document.getElementById('homelogo').style.transition = "transform 1s linear";
    setTimeout(function(){
      $state.go('login');
    },1000);
  };
  $scope.addMeeting = function(newmeeting){
    var user = $scope.loggedinuser;
    user.meetings.push(newmeeting);
    mainServ.putMe(user)
    .then(function(res){
      $state.go('profile');
      $scope.getMe();
    });
  };



});
