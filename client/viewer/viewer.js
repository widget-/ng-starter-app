'use strict';

angular.module('myApp.viewer', [])

	.controller('Viewer', function ($mdSidenav, $mdDialog, kafkaSocket) {
		var vm = this;

		vm.panels = [
			{name: 'Topic 1',messages:['a','b','c']},
			{name: 'Topic 2',messages:['a','b','c']},
			{name: 'Topic 3',messages:['a','b','c']},
		];

		vm.addPanel = function ($event) {
			$mdDialog.show({
				parent: document.querySelector('body'),
				targetEvent: $event,
				template: `
					<md-dialog>
						<md-toolbar class="md-primary md-toolbar-tools">
							<h2>
								Add topic
							</h2>
						</md-toolbar>
						<md-dialog-content class="md-dialog-content" style="padding-bottom:0">
							<md-input-container style="margin-bottom:0">
								<label>Topic name</label>
								<input ng-model="topic">
							</md-input-container>
						</md-dialog-content>
						<md-dialog-actions>
							<md-button ng-click="$mdDialog.hide()">
								Cancel
							</md-button>
							<md-button class="md-primary" ng-click="$mdDialog.hide(topic)">
								Add
							</md-button>
						</md-dialog-actions>
					</md-dialog>
				`,
				locals: {
					items: $scope.items
				},
				controller: function($scope) {
					$scope.$mdDialog = $mdDialog;
				}
      }).then(function(topic) {
				vm.panels.push({
					name: topic,
					messages: ['a','b','c']
				});
				console.debug(vm.panels);
			});
		}

		vm.showLeftSidenav = function () {
			$mdSidenav('sidenav').open();
		}
	});
