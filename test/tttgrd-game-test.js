QUnit.test("Default values in scope 0", function (assert, $scope) {
  $scope.disableAllCells();
	assert.equal($scope.cells.length, 81, "should be 81.");
});