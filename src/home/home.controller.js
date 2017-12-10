(function () {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['UserService', '$rootScope', '$scope'];
	function HomeController(UserService, $rootScope, $scope) {
		var vm = this;

		vm.user = null;
		vm.allUsers = [];

		initController();

		function initController () {
			loadCurrentUser();
			loadAllUsers();
		}

		function loadCurrentUser () {
			vm.user = $rootScope.globals.currentUser;
		}

		function loadAllUsers () {
			const dbRoot = firebase.database().ref();
			const users = dbRoot.child("users");
			users.once("value")
			.then(function(snapshot) {
				snapshot.forEach(item => {
					vm.allUsers.push(item.val());
				});
				$scope.$apply();
				console.log(`Retrieved ${vm.allUsers.length} users.`);
			})
			.catch(function (error) {
				console.log("Unable to Retrieve Active Players.");
			});
		}

		this.deleteUser = function (id) {
			console.log("Request to delete user.");
		}
  }
})();