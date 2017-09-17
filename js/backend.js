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
    
    createNode : function(title, nodeStory, parentId, childNum, choices){
        var nodeId = parentId + '_' + childNum;
        var newNode = new Node(title, nodeStory, nodeId, parentId, choices);
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

