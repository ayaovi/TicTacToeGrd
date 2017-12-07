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
			const dbRoot = firebase.database().ref();
			const users = dbRoot.child("users");

			user.getIdToken(true)
			.then(function (idToken) {
				const visitor = {
					uid: user.uid,
					idToken: idToken,
					email: user.email,
					username: user.email,
					emailVerified: user.emailVerified,
					arrivedAt: firebase.database.ServerValue.TIMESTAMP,
					userAgent: navigator.userAgent
				};

				const activeUserRef = users.push(visitor, function() {
					users.child(visitorId).once('value', function (snapshot) {
						visitor.arrivedAt = snapshot.child('arrivedAt').val();
						const pastVisitors = dbRoot.child('pastVisitors');
						visitor.leftAt = firebase.database.ServerValue.TIMESTAMP;
						pastVisitors.child(visitorId).onDisconnect().set(visitor);
					});
				});
				
				const visitorId = activeUserRef.key;
				
				activeUserRef.onDisconnect().remove();

				$rootScope.globals = {
				  currentUser: visitor
				};

				const cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
			})
			.catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log("Token Retrieval Unsuccessful.");
			});
		}
	}
})();
