/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["manage/cw/admin/costwalkadmin/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
