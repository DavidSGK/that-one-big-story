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
	$scope.currentPageNumber = 0;
	$scope.currentRating;
	$scope.storyContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit justo, varius vitae vulputate et, mattis ac orci. Phasellus ac odio ut dui lacinia suscipit a id dolor. Vestibulum at vestibulum nunc. Vestibulum tincidunt lectus ante, sit amet mollis dui iaculis a. Vestibulum tincidunt, neque sit amet porta viverra, sapien lacus congue neque, non ultrices neque mauris eget odio. Cras interdum ornare lectus, eu cursus nisi gravida ut. In sit amet neque nec arcu convallis vehicula nec id felis. Aliquam erat volutpat. Maecenas ornare odio vel odio fermentum, a lobortis turpis tincidunt. Quisque facilisis enim ut tincidunt hendrerit. Pellentesque rhoncus nulla vel felis vulputate, sed egestas lorem ultrices.Cras non felis massa. Sed ut ligula congue, venenatis sapien quis, finibus libero. Nullam eu massa orci. Pellentesque bibendum, nisi non cursus facilisis, justo nunc pretium nulla, at auctor libero ipsum fringilla nisi. Pellentesque sagittis mi sagittis, accumsan enim eget, lacinia leo. Nulla vitae sollicitudin leo, porttitor vehicula sapien. Suspendisse potenti. Ut aliquam facilisis arcu vel tristique. Phasellus pretium gravida felis, eu vulputate eros gravida quis. Fusce elit augue, rhoncus non mauris eget, fringilla congue sem. Cras porttitor malesuada magna nec pulvinar. Nulla ornare maximus mollis. Donec fringilla finibus iaculis. Morbi bibendum lorem et elit fermentum, vitae cursus leo aliquet. Ut id arcu egestas, mattis mi non, hendrerit lorem. Fusce vestibulum augue in dui cursus sollicitudin. Nullam fringilla maximus ipsum, aliquet dictum purus vehicula eu. Proin accumsan, lectus vel euismod commodo, arcu eros dictum mauris, a aliquam odio nibh sit amet sapien. Duis tincidunt diam at ipsum aliquet, at fermentum odio rhoncus. Fusce a egestas enim. Mauris ullamcorper ex in arcu posuere cursus.Cras eros ex, semper a mattis nec, eleifend eget nibh. Aenean non facilisis erat, in tempor mauris. Morbi vulputate, nunc in faucibus accumsan, massa mauris laoreet mi, eget aliquet erat dolor in lorem. Duis ultricies sapien aliquam nibh gravida lobortis in eu lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tincidunt dolor id sem tempor, vitae aliquet ligula accumsan. Aliquam erat volutpat. Praesent nec pretium massa. Fusce efficitur purus at quam ultrices efficitur. Nam vel sapien quis nisi viverra rutrum. Vivamus eget diam eu nisl pharetra euismod.Curabitur vitae odio accumsan, finibus purus ut, eleifend arcu. Sed nisi libero, ullamcorper vitae justo vestibulum, dignissim vulputate velit. Integer elit lorem, gravida ut vestibulum ut, fringilla et lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis euismod ex eget enim placerat, vel finibus risus tempor. Sed diam nunc, laoreet at sodales in, tincidunt vel ex. Maecenas molestie varius ligula. Donec ac pretium ligula, eget accumsan leo. Cras in auctor lectus. Praesent et massa quis eros lacinia ornare eu a lectus.';

	angular.element(document).ready(function() {
		//alert();
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
