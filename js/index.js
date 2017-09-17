var mainApp = angular.module('mainApp',[]);

var errorDebug = {
    userAuthenticationError: null,
}

var dataTransfer = {
    
    loadData : function(nodeId , callback) {
        firebase.database().ref('treeData/' + nodeId).once('value').then(function(snapshot) {
            callback(snapshot.val());
        });
    }, 

    addData : function(newNode){
        firebase.database().ref('treeData/' + newNode.nodeId).set(newNode);        
    }

};

var userAuthentication = {

    login : function(email,password){
        firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
			errorDebug.userAuthenticationError = error;
        });
    },

    logout : function(callback){
        firebase.auth().signOut().then(callback).catch(function(error) {
            errorDebug.userAuthenticationError = error;
        });
    },

    createNewUser : function(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            errorDebug.userAuthenticationError = error;
        });
    }

};

var Node = function(title, nodeStory, nodeId, parentId, choices) {
    this.title = title; // The title of this chapter/section
    this.nodeStory = nodeStory; // The story, an array (for linebreaks)
    this.nodeId = nodeId;   // The id of the node in the tree
    this.parentId = parentId;   // The parent node's id
    this.choices = choices; // The choices at the end of this section, an array
    this.rating = 0; // rating of section is initialized to 0 by default
}

var nodeNav = {
    
    getNode : function(nodeId , callback){
        return dataTransfer.loadData(nodeId, callback);
    },
    
    createNode : function(title, nodeStory, parentId, childNum ,choices){
        var nodeId = parentId + '_' + childNum;
        var newNode = new Node(title, nodeStory, nodeId, parentId, choices);
        dataTransfer.addData(newNode);
    },

    nextNode : function(currentNode, childIndex, callback) {
        nodeNav.getNode(currentNode + '_' + childIndex, callback);
    }

};

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

	$scope.ifUserLoggedIn = false;
	$scope.currentSection;
	$scope.currentPageNumber = 0;
	$scope.currentRating = 0;
	$scope.choices;
	$scope.choiceIndex;
	//$scope.storyTitle = "Sample Title";
	$scope.storyTitle;
	//$scope.storyContent = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit justo, varius vitae vulputate et, mattis ac orci. Phasellus ac odio ut dui lacinia suscipit a id dolor. Vestibulum at vestibulum nunc. Vestibulum tincidunt lectus ante, sit amet mollis dui iaculis a. Vestibulum tincidunt, neque sit amet porta viverra, sapien lacus congue neque, non ultrices neque mauris eget odio. Cras interdum ornare lectus, eu cursus nisi gravida ut. In sit amet neque nec arcu convallis vehicula nec id felis. Aliquam erat volutpat. Maecenas ornare odio vel odio fermentum, a lobortis turpis tincidunt. Quisque facilisis enim ut tincidunt hendrerit. Pellentesque rhoncus nulla vel felis vulputate, sed egestas lorem ultrices.Cras non felis massa. Sed ut ligula congue, venenatis sapien quis, finibus libero. Nullam eu massa orci. Pellentesque bibendum, nisi non cursus facilisis, justo nunc pretium nulla, at auctor libero ipsum fringilla nisi. Pellentesque sagittis mi sagittis, accumsan enim eget, lacinia leo. Nulla vitae sollicitudin leo, porttitor vehicula sapien. Suspendisse potenti. Ut aliquam facilisis arcu vel tristique. Phasellus pretium gravida felis, eu vulputate eros gravida quis. Fusce elit augue, rhoncus non mauris eget, fringilla congue sem. Cras porttitor malesuada magna nec pulvinar. Nulla ornare maximus mollis. Donec fringilla finibus iaculis. Morbi bibendum lorem et elit fermentum, vitae cursus leo aliquet. Ut id arcu egestas, mattis mi non, hendrerit lorem. Fusce vestibulum augue in dui cursus sollicitudin. Nullam fringilla maximus ipsum, aliquet dictum purus vehicula eu. Proin accumsan, lectus vel euismod commodo, arcu eros dictum mauris, a aliquam odio nibh sit amet sapien. Duis tincidunt diam at ipsum aliquet, at fermentum odio rhoncus. Fusce a egestas enim. Mauris ullamcorper ex in arcu posuere cursus.Cras eros ex, semper a mattis nec, eleifend eget nibh. Aenean non facilisis erat, in tempor mauris. Morbi vulputate, nunc in faucibus accumsan, massa mauris laoreet mi, eget aliquet erat dolor in lorem. Duis ultricies sapien aliquam nibh gravida lobortis in eu lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tincidunt dolor id sem tempor, vitae aliquet ligula accumsan. Aliquam erat volutpat. Praesent nec pretium massa. Fusce efficitur purus at quam ultrices efficitur. Nam vel sapien quis nisi viverra rutrum. Vivamus eget diam eu nisl pharetra euismod.Curabitur vitae odio accumsan, finibus purus ut, eleifend arcu. Sed nisi libero, ullamcorper vitae justo vestibulum, dignissim vulputate velit. Integer elit lorem, gravida ut vestibulum ut, fringilla et lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis euismod ex eget enim placerat, vel finibus risus tempor. Sed diam nunc, laoreet at sodales in, tincidunt vel ex. Maecenas molestie varius ligula. Donec ac pretium ligula, eget accumsan leo. Cras in auctor lectus. Praesent et massa quis eros lacinia ornare eu a lectus.'];
	$scope.storyContent;
	$scope.fromLogin = true;

	$scope.logout = function(){
		userAuthentication.logout(function(){
			$scope.ifUserLoggedIn = false;
		})
	};

	angular.element(document).ready(function() {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyBbMkxw2Enicr_MMN0CIKacBbo4Dzbh0iM",
			authDomain: "thatonestory-39da0.firebaseapp.com",
			databaseURL: "https://thatonestory-39da0.firebaseio.com",
			projectId: "thatonestory-39da0",
			storageBucket: "thatonestory-39da0.appspot.com",
			messagingSenderId: "679043859868"
		};
		
		firebase.initializeApp(config);

		document.getElementById('loginButton').onclick = function(){
			userAuthentication.login($scope.username, $scope.password);
			$scope.fromLogin = true;
		}

		document.getElementById('signUpButton').onclick = function(){
			userAuthentication.createNewUser($scope.usernameSignUp, $scope.passwordSignUp);
			$scope.fromLogin = false;
		}

		document.getElementById('addStoryButton').onclick = function(){
			if($scope.ifUserLoggedIn) {
				var allElements = document.getElementsByClassName('choice-field');
				var allChoices = [];
				for(var element = 0 ; element < allElements.length; element++){
					allChoices.push(allElements[element].innerText);
				}
				if($scope.newStory && $scope.newStory.length > 0 && allChoices && allChoices.length > 0) {
					nodeNav.createNode($scope.title ,$scope.newStory.split('\n'), $scope.currentSection , $scope.choiceIndex, allChoices)
				}
			}
		}

		document.getElementById('addChoiceButton').onclick = function(){
			if($scope.ifUserLoggedIn) {
				var choiceContainer = document.getElementById('choice-container');
				var choiceField = document.createElement('li');
				choiceField.appendChild(document.createTextNode($scope.choiceField));
				choiceField.classList.add('choice-field');
				choiceContainer.appendChild(choiceField);
			}
		}

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				$scope.emailOfUser = user.email;
				$scope.ifUserLoggedIn = true;
				if($scope.fromLogin){
					$scope.closeModal();
				}else{
					$scope.closeAddUserModal();
				}
				$scope.$apply();
			} else {
				// On Successful Logout
				
			}
		});

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
				$scope.choiceIndex = key;
				$scope.addStoryModal();
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

	$scope.addUserModal = function() {
		document.getElementById('addUser').style.display = "block";
	}

	$scope.closeAddUserModal = function() {
		document.getElementById('addUser').style.display = "none";
	}

	$scope.addStoryModal = function() {
		if($scope.ifUserLoggedIn) {
			document.getElementById('addStory').style.display = "block";
		}
	}

	$scope.closeAddStoryModal = function() {
		document.getElementById('addStory').style.display = "none";
	}

}]);


window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}
