angular.module('magicApp').service('mainServ', function($http){
  this.checkemail = function(email){
    return $http({
      method: "GET",
      url: "/users?email="+email
    })
    .then(function(res){
      return res.data ? true : false;
    });
  };
});
