/*
 Copyright (C) 2015-2016  DING Changchang (of Canaan Creative)

 This file is part of Avalon Management System (AMS).

 AMS is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 AMS is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with AMS. If not, see <http://www.gnu.org/licenses/>.
*/
(function (){
	'use strict';

	angular
		.module('ams')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider
			.when('/overview', {
				templateUrl: "app/pages/overview.html",
				controller: 'OverviewController',
				controllerAs: 'vm',
			})
			.when('/detail', {
				templateUrl: "app/pages/detail.html",
				controller: 'DetailController',
				controllerAs: 'vm',
			})
			.when('/setting', {
				templateUrl: "app/pages/setting.html",
				controller: 'SettingController',
				controllerAs: 'vm',
			})
			.otherwise({redirectTo: '/overview'});
	}
})();
