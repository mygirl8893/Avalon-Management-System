(function() {
	'use strict';

	angular
		.module('ams')
		.controller('OverviewController', OverviewController);

	OverviewController.$inject = ['$location', 'ShareService', 'APIService'];

	function OverviewController($location, share, api) {
		/* jshint validthis: true */
		var vm = this;

		vm.status = share.status.overview;

		share.status.main.title = "Overview";
		share.status.main.subTitle = false;

		vm.hashrateChart = {};
		vm.hashrateChart.loaded = false;
		vm.hashrateChart.options = share.hashrateChartOptions;
		vm.aliverateChart = {};
		vm.aliverateChart.loaded = false;
		vm.aliverateChart.options = share.aliverateChartOptions;
		vm.summaryLoaded = false;
		vm.issueLoaded = false;
		vm.data = api.data;
		vm.gotoDetail = gotoDetail;
		vm.ecDecode = ecDecode;

		vm.summaryTable = [{
			name: 'Node',
			value: function(data) {return data.ip + ':' + data.port;},
		}, {
			name: 'Modules',
			value: function(data) {return data.module;},
		}, {
			name: 'Temperature',
			value: function(data) {
				return parseFloat(data.temp).toFixed(1) +
					' / ' + parseFloat(data.temp0).toFixed(1) +
					' / ' + parseFloat(data.temp1).toFixed(1);
			},
		}];

		if (share.status.main.time === 0)
			share.getLastTime().then(getChart);
		else
			getChart();

		function getChart() {
			api.getFarmHashrate(
				share.status.main.time - 30 * 24 * 3600,
				share.status.main.time
			).then(
				function() {
					vm.hashrateChart.loaded = true;
			});

			api.getSummary(share.status.main.time).then(
				function() {
					vm.summaryLoaded = true;
			});

			api.getIssue(share.status.main.time).then(
				function() {
					vm.issueLoaded = true;
			});

			api.getAliverate(
				share.status.main.time - 30 * 24 * 3600,
				share.status.main.time
			).then(
				function() {
					vm.aliverateChart.loaded = true;
			});
		}

		function gotoDetail(ip, port, dna) {
			if (dna)
				$location.path('/detail')
					.search('ip', ip)
					.search('port', port)
					.search('dna', dna);
			else
				$location.path('/detail')
					.search('ip', ip)
					.search('port', port);
		}

		function ecDecode(ec) {
			var errcode = [
				null, 'TOOHOT', 'LOOP0FAILED', 'LOOP1FAILED',
				'INVALIDMCU', null, null, null,
				null, 'NOFAN', 'PG0FAILED', 'PG1FAILED',
				'CORETESTFAILED', 'ADC0_ERR', 'ADC1_ERR', 'VOLTAGE_ERR'
			];
			var msg = '';
			for (var i = 0; i < errcode.length; i++)
				if (((ec >> i) & 1) && (errcode[i]))
					msg += errcode[i] + ' ';
			return msg;
		}
	}
})();
