'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
   
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
    
	
	
	$scope.onClick3 = function(){
	/*	var chatRef = new Firebase('https://comicshare.firebaseio.com');
		var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		auth.login('facebook');	
		if (error) {
			// an error occurred while attempting login
			console.log(error);
			} else if (user) {
			// user authenticated with Firebase
			console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
			} else {
			// user is logged out
				}
			}
			
		}
	
	
	function init(){
	 */		
   }
  
   }])

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
		
		var canvas, stage;
        var drawingCanvas;
        var oldPt;
        var oldMidPt;
        var title;
        var color;
        var stroke;
        var colors;
        var index;
		
		
		init();
		
		var context = canvas.getContext('2d');
		$scope.onClick1 = function()
		{
			
			var w = canvas.width;
			canvas.width = 1;
			canvas.width = w;
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		$scope.onClick2 = function()
		{		
			toImage();
			
		}
		function toImage(){
			var ctx = canvas.getContext("2d");
			var img = new Image();
			img.src = canvas.toDataURL();
			console.log(img.src)
			var messageListRef = new Firebase("https://comicshare.firebaseio.com/message_list");
            var newMessageRef = messageListRef.push();
			newMessageRef.set({'appid': '2', 'text': img.src});
		}
		
        function init() {
			
			if (window.top != window) {
                document.getElementById("header").style.display = "none";
            }
            canvas = document.getElementById("myCanvas");
            index = 0;
            colors = ["#000000"];

            //check to see if we are running in a browser with touch support
            stage = new createjs.Stage(canvas);
            stage.autoClear = false;
            stage.enableDOMEvents(true);

            createjs.Touch.enable(stage);
            createjs.Ticker.setFPS(24);

            drawingCanvas = new createjs.Shape();

            stage.addEventListener("stagemousedown", handleMouseDown);
            stage.addEventListener("stagemouseup", handleMouseUp);

            stage.addChild(drawingCanvas);
            stage.update();
        }

        function stop() {}

        function handleMouseDown(event) {
            if (stage.contains(title)) { stage.clear(); stage.removeChild(title); }
            color = colors[(index++)%colors.length];
            stroke = 15;
            oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
            oldMidPt = oldPt;
            stage.addEventListener("stagemousemove" , handleMouseMove);
        }

        function handleMouseMove(event) {
            var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

            drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

            oldPt.x = stage.mouseX;
            oldPt.y = stage.mouseY;

            oldMidPt.x = midPt.x;
            oldMidPt.y = midPt.y;

            stage.update();
        }

        function handleMouseUp(event) {
            stage.removeEventListener("stagemousemove" , handleMouseMove);
        }
   }])

   .controller('MainPageCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
		var place=11;
		init();
		var listRef = new Firebase('https://comicshare.firebaseIO.com/message_list');
		
		function init(){
			var listRef = new Firebase('https://comicshare.firebaseio.com/message_list');
			listRef.on('child_added', function(snapshot) {
				
				var msgData = snapshot.val().text;
				console.log(place);
				if(place > 12){place=1;}
				
			
				var canvas = document.getElementById(""+place);
				var ctx = canvas.getContext("2d");
				var w = canvas.width;				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				canvas.width = w;
				
				var img = new Image();
				img.src = msgData;
				ctx.drawImage(img,0,0,480,520,0,0,130,140);
				place ++;
				
				
			});
		}
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
      
   }   ]   );