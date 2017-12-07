(function () {
	"use strict";
	
	angular
	.module("app")
	.controller('GameController', GameController);
	
	GameController.$inject = ['UserService', '$rootScope'];
	
	function GameController(UserService, $rootScope) {
		const vm = this;
		vm.user = null;
		vm.activePlayers = null;
		
		// const util = new Util();
		// const canvasController = new CanvasController();
		
		initController();

		function initController() {
			loadCurrentUser();
		}
		
		function loadCurrentUser() {
			vm.user = $rootScope.globals.currentUser;
		}
		
		function getActivePlayers() {
			console.log("Request to get Active Players.");
			const dbRoot = firebase.database().ref();
			const users = dbRoot.child("users");

			users.on("value", function(snapshot) {
				vm.activePlayers = snapshot.value;
			}, function (error) {
				console.log("Unable to Retrieve Active Players.");
			});
		}
	}
})();