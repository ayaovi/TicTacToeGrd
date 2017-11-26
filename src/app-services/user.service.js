(function () {
	'use strict';

	angular
			.module('app')
			.factory('UserService', UserService);

	UserService.$inject = ['$http'];
	function UserService($http) {
		const service = {};
		const apiBaseUrl = 'http://localhost:50032/';

		service.Authenticate = Authenticate;
		service.GetByUsername = GetByUsername;
		service.GetActivePlayers = GetActivePlayers;
		service.Create = Create;
		service.Update = Update;
		service.Delete = Delete;

		return service;

		function GetByUsername(username) {
			return $http.get(`${apiBaseUrl}/${username}`).then(handleSuccess, handleError);
		}
		
		function GetActivePlayers() {
			return $http.get(`${apiBaseUrl}/${username}`).then(handleSuccess, handleError);
		}

		function Authenticate(username, password) {
			return $http.post(`${apiBaseUrl}/authenticate`, { username: username, password: password })
				.then(handleSuccess, handleError);
		}

		function Create(user) {
			return $http.post(`${apiBaseUrl}/register`, user).then(handleSuccess, handleError);
		}

		function Update(user) {
			return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError);
		}

		function Delete(id) {
			return $http.delete('/api/users/' + id).then(handleSuccess, handleError);
		}

		// private functions

		function handleSuccess(res) {
			return { success: true, data: res.data };
		}

		function handleError(res) {
			return { success: false, message: res.data };
		}
	}
})();
