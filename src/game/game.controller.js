(function () {
	"use strict";
	
	angular
	.module("app")
	.controller('GameController', GameController);
	
	GameController.$inject = ['$rootScope', '$scope'];
	
	function GameController($rootScope, $scope) {
		const vm = this;
		vm.user = null;
		vm.activePlayers = [];
		
		// const util = new Util();
		// const canvasController = new CanvasController();
		
		initController();

		function initController() {
			loadCurrentUser();
		}
		
		function loadCurrentUser() {
			vm.user = $rootScope.globals.currentUser;
		}
		
		this.getActivePlayers = function () {
			// console.log("Request to get Active Players.");
			const dbRoot = firebase.database().ref();
			const users = dbRoot.child("users");

			users.once("value")
			.then(function(snapshot) {
				snapshot.forEach(item => {
					vm.activePlayers.push(item.val());
				});
				$scope.$apply();
				console.log(`Retrieved ${vm.activePlayers.length} active player(s).`);
			})
			.catch(function (error) {
				console.log("Unable to Retrieve Active Players.");
			});
		}

		this.challengeAI = function () {
			console.log("Request to challenge AI.");
		}
	}
})();