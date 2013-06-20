"use strict";
angular.module('decider', ['ui.bootstrap']);

function dataCtrl($scope) {
	$scope.global = { voter: "jeff" };
	$scope.scores= [-2, -1, 0, 1, 2];

	function User(name, votes) {
		this.name = name;
		this.votes = votes || {};
		this.isDone = function () {
			return Object.keys(this.votes).length === $scope.choices.length;
		};
	}

	function Choice(name) {
		this.name = name;
		this.getScore = function () {
			var _this = this;
			return $scope.users.map(function (user) {
				return user.votes[_this.name] || 0;
			}).reduce(function (total, score) {
				return total += score;
			}, 0);
		};
	}

	function isNameTaken (name, objects) {
		return objects.map(function (object) {
			return object.name;
		}).indexOf(name) !== -1;
	}

	$scope.users = [
		new User("jeff", {
			"chipotle": -1,
			"panda express": 1,
		}),
		new User("parsha"),
	];

	$scope.choices = [
		new Choice("chipotle"),
		new Choice("panda express"),
	];

	$scope.addUser = function() {
		var name = $scope.formUserName;
		if ( ! isNameTaken(name, $scope.users)) {
			$scope.users.push(new User(name));
		}
		$scope.formUserName = "";
	};

	$scope.addChoice = function() {
		var name = $scope.formChoiceName;
		if (! isNameTaken(name, $scope.choices)) {
			$scope.choices.push(new Choice(name));
		}
		$scope.formChoiceName= "";
	};

	$scope.getVoter = function() {
		return $scope.getUserWithName($scope.global.voter);
	};

	$scope.getUserWithName = function(name) {
		var matches = $scope.users.filter(function(user) {
			return user.name === name;
		});
		if (matches.length === 1) {
			return matches[0];
		}
		else return null;
	};

	$scope.winner = function() {
		return $scope.choices.reduce(function(best, choice) {
			if (choice.getScore() > best.getScore()) {
				return choice;
			}
			else {
				return best;
			}
		});
	};

	$scope.finished = function() {
		return $scope.users.reduce(function(othersDone, user){
			return othersDone && user.isDone();
		}, true);
	};
}
