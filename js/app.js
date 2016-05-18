

'use strict';

var sortelloApp = angular.module('sortelloApp',[]);

sortelloApp.controller('sortelloCtrl', ["$scope", "dataService", function($scope, dataService){
  $scope.data = [];
  $scope.listFilter = "";
  $scope.tagFilter = "";
  $scope.jsonUrl = "";

  function getData(url){
    dataService.getJson(url).then(
      function(data){
        $scope.data = data;
      },
      function(err){
        console.log(err);
      }
    )
  }

  $scope.setColumn = function(id){
    $scope.list = id;
  };

  $scope.toggleDesc = function(item){
    if(item.open){
      item.open = false;
    }
    else {
      item.open = true;
    }

  };

  $scope.setTag = function(id){
    $scope.tagFilter = id;
  };

  $scope.getJson = function(){
    if($scope.jsonUrl.length){
      getData($scope.jsonUrl)
    }
  };

  $scope.authorise = function(){
    Trello.authorize({
      type: 'popup',
      name: 'Sortello Application',
      scope: {read: true, write: true},
      expiration: "never",
      success: $scope.authenticationSuccess,
      error: $scope.authenticationFailure
    });
  };

  $scope.authenticationSuccess = function(){

  };
  $scope.authenticationFailure = function(){

  };

}]);

sortelloApp.factory('dataService', ['$q', '$http', function($q, $http){
  return {
    getJson : function(url){
      var defered = $q.defer();
      $http.get(url)
        .success(function(data){
          defered.resolve(data);
        }).error(function(msg, code){
        console.log('such error: ' + msg);
      });
      return defered.promise;
    }
  }
}]);
