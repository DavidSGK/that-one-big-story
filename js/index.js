var mainApp = angular.module('mainApp',[]);

mainApp.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

mainApp.controller('MainCtrl', ['$http', '$scope', '$sce', function($http, $scope, $sce) {

	$scope.currentSection;
	$scope.currentSuggestions = ['lmao', 'cool', 'nice'];
	$scope.currentPageNumber = 1;
	$scope.currentRating;
	$scope.storyContent = 'A narrative or story is a report of connected events, real or imaginary, presented in a sequence of written or spoken words, or still or moving images,[1][2] or both. The word derives from the Latin verb narrare, "to tell", which is derived from the adjective gnarus, "knowing" or "skilled".[3] Narrative can be organized in a number of thematic or formal categories: non-fiction (such as definitively including creative non-fiction, biography, journalism, transcript poetry, and historiography); fictionalization of historical events (such as anecdote, myth, legend, and historical fiction); and fiction proper (such as literature in prose and sometimes poetry, such as short stories, novels, and narrative poems and songs, and imaginary narratives as portrayed in other textual forms, games, or live or recorded performances).';
	$scope.currentPageNumber = 0;
	$scope.currentRating = 0;
	$scope.choices;
	$scope.storyTitle;
	$scope.storyContent;

	angular.element(document).ready(function() {
		var start = nodeNav.getNode('tree_0', function(node) {
			$scope.$apply(function() {
				$scope.currentSection = node.nodeId;
				$scope.storyTitle = node.title;
				$scope.storyContent = node.nodeStory;
				$scope.choices = node.choices;
				$scope.currentRating = node.rating;
			});
		});
		console.log('ready');
	});

	$scope.sidebarExpanded = false;
	$scope.sidebarExpandedStyle;
	$scope.sidebarContent;
	$scope.fontSize = 12;
	$scope.nightMode = false;
	$scope.lineHeight = 10/7;
	$scope.pageStyle = {
		'background-color': '#F5F5F5', 
		'color': '#333333', 
	}
	$scope.storyStyle = { 
		'font-family': 'Helvetica', 
		'font-size': '12pt',
		'line-height': 10/7
	};

	$scope.postTreeData = function(key, value) {

	}

	$scope.getTreeData = function(key) {
	/* get template
  	$http.get('someDataUrl').then(function(data){
    	this.value = data;
  	});
  	*/
  	nodeNav.getNode('tree_0', function(val) { console.log(val); });
	}

	$scope.changePage = function(key) {
		nodeNav.nextNode($scope.currentSection, key, function(node) {
			if (node === null) {
				console.log('welp');
			} else {
				$scope.$apply(function () {
					$scope.currentSection = node.nodeId;
					$scope.storyTitle = node.title;
					$scope.storyContent = node.nodeStory;
					$scope.choices = node.choices;
				});
			}
		});
	}

	// UI Functionality

	$scope.rateUp = function() {

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
				$scope.sidebarContent = $sce.trustAsHtml(
						'<ul>' +
							'<li ng-click="changeFont(\'Times New Roman\')" style="font-family: Times New Roman">Times New Roman</li>' +
							'<li ng-click="changeFont(\'Helvetica\')" style="font-family: Helvetica">Helvetica</li>' +
							'<li ng-click="changeFont(\'Monospace\')" style="font-family: Monospace">Monospace</li>' +
						'</ul>'
					);
				break;
			case 'fontSize':
				$scope.sidebarExpandedStyle = {'top': baseTop + ' + 48px)'};
				$scope.sidebarContent = $sce.trustAsHtml(
						'<div class="single-option" id="font-size">' +
							'Font Size: ' +
							'<input type="number" min="4" max="40" ng-model="fontSize" ng-change=changeFontSize(fontSize)></input>' +
						'</div>'
					);
				break;
			case 'nightMode':
				$scope.sidebarExpandedStyle = {'top': baseTop + ' + 96px)'};
				$scope.sidebarContent = $sce.trustAsHtml(
						'<div class="single-option">' +
							'<input id="night-mode" type="checkbox" ng-model="nightMode" ng-change="setNightMode(nightMode)"></input>Night Mode' +
						'</div>'
					);
				break;
			case 'lineHeight':
				$scope.sidebarExpandedStyle = {'top': baseTop + ' + 144px)'};
				$scope.sidebarContent = $sce.trustAsHtml(
						'<div class="single-option slider-container">' +
							'<input type="range" min="1" max="5" class="slider" ng-model="lineHeight" ng-change="changeLineHeight(lineHeight)"></input>' +
						'</div>'
					);
				break;
			default:
				$scope.sidebarExpanded = false;
				break;
		}
	}

	$scope.changeFont = function(font) {
		$scope.storyStyle = Object.assign($scope.storyStyle, {'font-family': font});
		$scope.sidebarExpanded = false;
	}

	$scope.changeFontSize = function(size) {
		$scope.fontSize = size;
		console.log($scope.fontSize);
		$scope.storyStyle = Object.assign($scope.storyStyle, {'font-size': size + 'pt'});
	}

	$scope.setNightMode = function(toggle) {
		$scope.nightMode = toggle;
		if (toggle) {
			$scope.pageStyle = Object.assign($scope.storyStyle, {'background-color': '#333333', 'color': '#F5F5F5'});
		} else {
			$scope.pageStyle = Object.assign($scope.storyStyle, {'background-color': '#F5F5F5', 'color': '#333333'});
		}
	}

	$scope.changeLineHeight = function(value) {
		$scope.lineHeight = value * 10 / 7;
		$scope.storyStyle = Object.assign($scope.storyStyle, {'line-height': $scope.lineHeight});
	}

	$scope.openModal = function() {
		document.getElementById('myModal').style.display = "block";
	}

	$scope.closeModal = function() {
		document.getElementById('myModal').style.display = "none";
	}

}]);


window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}
