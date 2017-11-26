(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'AuthenticationService', 'UserService', 'FlashService'];
	function LoginController($location, AuthenticationService, UserService, FlashService) {
		var vm = this;

		vm.login = login;

		(function initController() {
			// reset login status
			AuthenticationService.ClearCredentials();
		})();

		function login() {
			vm.dataLoading = true;
			UserService.Authenticate(vm.username, vm.password)
				.then(function (response) {
					if (response.success) {
						AuthenticationService.SetCredentials(vm.username, vm.password);
						$location.path('/');
					} else {
						FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				});
		};
	}
})();
