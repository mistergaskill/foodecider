function dataCtrl($scope) {
	$scope.users = [
		{name: "jeff", votes: [], done: true},
		{name: "parsha", votes: [], done: false},
	];

	$scope.choices = [
		{name: "chipotle", score: 0},
		{name: "panda express", score: 0},
	];

	$scope.addUser = function() {
		$scope.users.push({
			name:$scope.formUserName,
			votes: [],
			done: false,
		});
	};

	$scope.addChoice = function() {
		$scope.choices.push({
			name:$scope.formChoiceName,
			score: 0,
		});
	};

}
