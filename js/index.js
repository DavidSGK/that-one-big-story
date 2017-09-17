var mainApp = angular.module('mainApp',[]);

mainApp.controller('MainCtrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {

	$scope.currentSection;
	$scope.currentSuggestions = ['lmao', 'cool', 'nice'];
	$scope.currentPageNumber = 0;
	$scope.currentRating;
	$scope.storyContent = 'A narrative or story is a report of connected events, real or imaginary, presented in a sequence of written or spoken words, or still or moving images,[1][2] or both. The word derives from the Latin verb narrare, "to tell", which is derived from the adjective gnarus, "knowing" or "skilled".[3] Narrative can be organized in a number of thematic or formal categories: non-fiction (such as definitively including creative non-fiction, biography, journalism, transcript poetry, and historiography); fictionalization of historical events (such as anecdote, myth, legend, and historical fiction); and fiction proper (such as literature in prose and sometimes poetry, such as short stories, novels, and narrative poems and songs, and imaginary narratives as portrayed in other textual forms, games, or live or recorded performances).';
	$scope.sidebarExpanded = false;
	$scope.sidebarExpandedStyle;
	$scope.sidebarContent;
	$scope.fontSize = 14;

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
		console.log()
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
