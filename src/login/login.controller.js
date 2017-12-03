(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location'];
	function LoginController($location) {
		var vm = this;

		vm.login = login;

		(function initController() {
			// reset login status
			// AuthenticationService.ClearCredentials();
		})();

		function login() {
			vm.dataLoading = true;
		};
	}
})();
