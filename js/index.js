var mainApp = angular.module('myApp',[]);

mainApp.controller('myController', ['$http', function($http){

	this.currentSection;
	this.currentSuggestions = [];
	this.currentRating;

	angular.element(document).ready(function() {
		
	})

	this.postTreeData(key, value) {
	}

	this.getTreeData(key) {
	/* get template
  	$http.get('someDataUrl').then(function(data){
    	this.value = data;
  	});
  	*/
	}

	this.changePage(value) {

	}



	// UI Functionality

	this.reateUp() {

	}

	this.rateDown() {

	}

	this.report() {

	}

	this.changeFont(size) {

	}

}])