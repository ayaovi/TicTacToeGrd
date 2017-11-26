(function () {
	'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['UserService', '$rootScope'];
	function HomeController(UserService, $rootScope) {
		var vm = this;

		vm.user = null;

		initController();

		function initController() {
			loadCurrentUser();
		}

		function loadCurrentUser() {
			UserService.GetByUsername($rootScope.globals.currentUser.username)
				.then(function (response) {
					if (response.success) {
						vm.user = response.data;
					}
					else {
						vm.user = {};
					}
				});
		}

		function deleteUser(id) {
			UserService.Delete(id)
				.then(function () {
					loadAllUsers();
				});
		}
  }
})();