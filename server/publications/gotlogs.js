'use strict';

import { Meteor } from 'meteor/meteor';

import GoTLog from '../../imports/collections/gotlogs';

Meteor.publish('allLogs', function () {
	let allLogs;
	if (!this.userId) return this.ready();
	allLogs = GoTLog.find({}, { sort: { when: -1 }});
	if (allLogs) return allLogs;
	return this.ready();
});
