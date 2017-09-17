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

}



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

}

var Node = function(nodeStory, nodeId, parentId, numberOfChildren){
    this.nodeStory = nodeStory;
    this.nodeId = nodeId;
    this.parentId = parentId;
    this.numberOfChildren = numberOfChildren;
}

var nodeNav = {
    
    getNode : function(nodeId , callback){
        return dataTransfer.loadData(nodeId, callback);
    },
    
    createNode : function(nodeStory, parentId, childNum, numberOfChildren){
        var nodeId = parentId + '_' + childNum;
        var newNode = new Node(nodeStory, nodeId, parentId, numberOfChildren);
        dataTransfer.addData(newNode);
    },

    nextNode : function(currentNode, childIndex, callback) {
        nodeNav.getNode(currentNode + '_' + childIndex, callback);
    }

}

var debug = true;

document.addEventListener('DOMContentLoaded', function(){
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

    if(debug) {
        userAuthentication.login('armanit.garg@gmail.com', 'something');
    }

});

