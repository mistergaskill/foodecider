function dataCtrl($scope) {
	function User(name, votes) {
		this.name = name;
		this.votes = votes || [],
		this.done = function () {
			return this.votes.length === $scope.choices.length;
		};
	}

	function Choice(name) {
		this.name = name;
		this.score = 0;
	}

	$scope.users = [
		new User("jeff", [-1, 1]),
		new User("parsha"),
	];

	$scope.choices = [
		new Choice("chipotle"),
		new Choice("panda express"),
	];

	$scope.addUser = function() {
		$scope.users.push(new User($scope.formUserName));
		$scope.formUserName = "";
	};

	$scope.addChoice = function() {
		$scope.choices.push(new Choice($scope.formChoiceName));
		$scope.formChoiceName= "";
	};
}
