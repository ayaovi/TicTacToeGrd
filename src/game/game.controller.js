(function () {
	"user strict";
	
	angular
	.module("app")
	.controller('GameController', GameController);
	
	GameController.$inject = ['UserService', '$rootScope'];
	
	function GameController(UserService, $rootScope) {
		const vm = this;
		vm.user = null;
		vm.activePlayers = null;
		
		const util = new Util();
		const canvasController = new CanvasController();
		
		initController();

		function initController() {
			loadCurrentUser();
		}
		
		function loadCurrentUser() {
			// we might want to load the user informations here.
		}
		
		function getActivePlayers() {
			UserService.GetActivePlayers()
			.then(function (response) {
				if (response.success) {
					vm.activePlayers = response.data.filter(player => player.Name !== vm.user.username);
				}
				else {
					console.log("Unable to retrieve active players.");
					vm.activePlayers = {};
				}
			});
		}
	}
})();