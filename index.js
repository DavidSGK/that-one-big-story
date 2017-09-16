var mainApp = angular.module('myApp',[]);

mainApp.controller('myController', ['$http', function($http){

	this.currentSection;
	this.currentSuggestions = [];
	this.currentRating;


	this.postTreeData(key, value) {
	}

	this.getTreeData() {
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