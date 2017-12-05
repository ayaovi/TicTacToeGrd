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
				
				if (user) {
					// log user in.
					logUser(user);
				}
				else {
					// something went wrong.
				}
				// $location.path('/game').replace();
				// $scope.$apply();
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
		};

		function logUser(user) {
			const userRef = firebase.database().ref("users/");

			user.getIdToken(true)
			.then(function (idToken) {
				const visitor = {
					uid: user.uid,
					idToken: idToken,
					email: user.email,
					emailVerified: user.emailVerified,
					arrivedAt: firebase.database.ServerValue.TIMESTAMP,
					userAgent: navigator.userAgent
				};

				userRef.push(visitor);
			})
			.catch(function () {
				console.log("Token Retrieval Unsuccessful.");
			});
		}
	}
})();
