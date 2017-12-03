(function () {
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$scope', '$location', '$cookies', '$rootScope'];
	function LoginController($scope, $location, $cookies, $rootScope) {
		var vm = this;

		vm.login = login;

		(function initController() {
			// reset login status
			$rootScope.globals = {};
			$cookies.remove('globals');
			// AuthenticationService.ClearCredentials();
		})();

		function login() {
			vm.dataLoading = true;
			firebase.auth().signInWithEmailAndPassword(vm.username, vm.password)
			.then(function () {
				console.log('Successful Login!');
				const user = firebase.auth().currentUser;
				//log user in.
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
		};
	}
})();
