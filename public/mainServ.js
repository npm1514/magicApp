angular.module('magicApp').service('mainServ', function($http){
  this.checkemail = function(email){
    return $http({
      method: "GET",
      url: "/users?email="+email
    }).then(function(res){
      return res.data.length ? true : false;
    });
  };
  this.login = function(user){
    return $http({
      method: "POST",
      url: "/login",
      data: user
    }).then(function(res){
      return res;
    }).catch(function(err) {
      return err;
    });
  };
  this.getMe = function(){
    return $http({
      method: "GET",
      url: "/me"
    }).then(function(res){
      return res;
    })
  };
  this.logout = function(){
    return $http({
      method: "GET",
      url: "/logout"
    }).then(function(res){
      return res;
    });
  };
  this.putMe = function(user){
    return $http({
      method: "PUT",
      url: "user/" + user._id,
      data: user
    }).then(function(res){
      return res;
    })
  }
});
