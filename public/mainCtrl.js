angular.module('magicApp').controller('mainCtrl', function($scope, mainServ){
  $scope.checkemail = function(email){
    mainServ.checkemail(email)
    .then(function(res){
      console.log(res);
    });
  };




});
