var mainApp = angular.module('mainApp',[]);

mainApp.controller('MainCtrl', ['$http', '$scope', function($http, $scope){

	$scope.currentSection;
	$scope.currentSuggestions = [];
	$scope.currentRating;

	angular.element(document).ready(function() {
		alert();
	});

	$scope.postTreeData = function(key, value) {

	}

	$scope.getTreeData = function(key) {
	/* get template
  	$http.get('someDataUrl').then(function(data){
    	this.value = data;
  	});
  	*/
	}

	$scope.changePage = function(value) {

	}

	// UI Functionality

	$scope.reateUp = function() {

	}

	$scope.rateDown = function() {

	}

	$scope.report = function() {

	}

	$scope.changeFont = function(size){

	}

}])
