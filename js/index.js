var mainApp = angular.module('mainApp',[]);

mainApp.controller('MainCtrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {

	$scope.currentSection;
	$scope.currentSuggestions = [];
	$scope.currentRating;
<<<<<<< HEAD

	angular.element(document).ready(function() {
		//alert();
	});
=======
	$scope.sidebarExpanded = false;
	$scope.sidebarExpandedStyle;
	$scope.sidebarContent;
	$scope.fontSize = 14;
>>>>>>> 84caa9703bc29bd2b4045dab5a07f634d26f51da

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

	$scope.sidebarExpand = function(type) {
		var baseTop = 'calc(50vh - 124px';
		$scope.sidebarExpanded = true;
		switch(type) {
			case 'font':
				$scope.sidebarExpandedStyle = {'top': baseTop + ')'};
				break;
			case 'fontSize':
				$scope.sidebarExpandedStyle = {'top': baseTop + ' + 48px)'};
				$scope.sidebarContent = $sce.trustAsHtml(
						'<div>' + $scope.fontSize + '</div>'
					);
				break;
			case 'nightMode':
				$scope.sidebarExpandedStyle = {'top': baseTop + ' + 96px)'};
				break;
			default:
				$scope.sidebarExpandedStyle = {'top': baseTop + ' + 144px)'};
				break;
		}
	}

	$scope.changeFont = function(font) {

	}

	$scope.changeFontSize = function(size) {

	}

	$scope.setNightMode = function(boolean) {

	}

}]);
