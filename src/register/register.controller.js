(function () {
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$scope', '$location', 'FlashService'];
	function RegisterController($scope, $location, FlashService) {
		var vm = this;

		vm.register = register;

		function register() {
			vm.dataLoading = true;
			firebase.auth().createUserWithEmailAndPassword(vm.user.username, vm.user.password)
			.then(function () {
				// const user = firebase.auth().currentUser;
				// console.log("Successful Registration!");
				$location.path('/login').replace();
				$scope.$apply();
			})
			.catch(function(error) {
				FlashService.Error(error.message);
				vm.dataLoading = false;
			});
		}
	}
})();
