/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/mdc/flexibility/Util",
	"sap/ui/fl/changeHandler/condenser/Classification"
], function(Util, Classification) {
	"use strict";

	var ChartTypeFlex = {};

	var fSetChartType = function(oChange, oChart, mPropertyBag) {
		var oModifier = mPropertyBag.modifier;
		return Promise.resolve()
			.then(oModifier.getProperty.bind(oModifier, oChart, "chartType"))
			.then(function(vOldValue) {
				// First store the old value for revert
				oChange.setRevertData(vOldValue);
				// Then set the new value
				oModifier.setProperty(oChart, "chartType", oChange.getContent().chartType);
			});
	};

	var fRevertChartType = function(oChange, oChart, mPropertyBag) {
		mPropertyBag.modifier.setProperty(oChart, "chartType", oChange.getRevertData());
		oChange.resetRevertData();
		return Promise.resolve();
	};

	var fGetCondenserInfoChartType = function(oChange, mPropertyBag) {
		return {
			classification: Classification.LastOneWins,
			affectedControl: oChange.getSelector(),
			uniqueKey: "chartType"
		};
	};

	ChartTypeFlex.setChartType = Util.createChangeHandler({
		apply: fSetChartType,
		revert: fRevertChartType,
		getCondenserInfo: fGetCondenserInfoChartType
	});

	return ChartTypeFlex;
});