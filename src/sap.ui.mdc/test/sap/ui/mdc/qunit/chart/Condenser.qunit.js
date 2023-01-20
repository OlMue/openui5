/* global */
sap.ui.define([
    "sap/ui/rta/enablement/elementActionTest"
], function(elementActionTest) {
    'use strict';



	function buildXML() {

		var sPropertyInfo = '';
		var sDelegate = '\\{"name": "delegates/odata/v4/vizChart/ChartDelegate", "payload": \\{"collectionName": "Books"\\}\\}';

		var b = '<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns:mdc="sap.ui.mdc">' +
		'<mdc:Chart id="myChart" p13nMode="Type" chartType="column" delegate=\'' +  sDelegate + '\' propertyInfo=\'' + sPropertyInfo + '\'>' +
		'</mdc:Chart>' +
		'</mvc:View>';

		return b;
	}

	function fnConfirm(oUiComponent, oViewAfterAction, assert) {
		var oChart = oViewAfterAction.byId("myChart");
		assert.ok(oChart);
	}

	// --------------------------------

	function fnOnAfterAction(oUiComponent, oViewAfterAction, assert) {
		var oChart = oViewAfterAction.byId("myChart");
		assert.ok(oChart);
		if (oChart.getMetadata) {
			assert.deepEqual(oChart.getChartType(), "bar", "expected inner conditions found");
		}
	}

	elementActionTest("Checking the chartType condensing. One changes expected.", {
		xmlView: buildXML(""),
		action: {
			name: "settings",
			controlId: "myChart",
			parameter: function () {
				return {
					changeType: "setChartType",
					content: {
						chartType: "bar"
					}
				};
			}
		},
		previousActions: [{
			name: "settings",
			controlId: "myChart",
			parameter: function () {
				return {
					changeType: "setChartType",
					content: {
						chartType: "line"
					}
				};
			}
		}],
		changesAfterCondensing: 1,
		afterAction: fnOnAfterAction,
		afterUndo: fnConfirm,
		afterRedo: fnConfirm
    });

});