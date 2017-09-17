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
	$scope.currentSuggestions = [];
	$scope.currentRating;
	$scope.sidebarExpanded = false;
	$scope.sidebarExpandedStyle;
	$scope.sidebarContent;
	$scope.fontSize = 14;
	$scope.nightMode = false;
	$scope.storyStyle = { 'font-family': 'Helvetica', 'background-color': '#FDFDFD', 'color': '#000000'};

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
						'<div>' + $scope.fontSize + '</div>'
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

	}

	$scope.setNightMode = function(toggle) {
		if (toggle) {
			// somethin
		}
	}

}]);
