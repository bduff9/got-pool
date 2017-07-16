'use strict';

import { Meteor } from 'meteor/meteor';

import User from '../../imports/collections/users';

Meteor.publish('allUsers', function () {
	let allUsers;
	if (!this.userId) return this.ready();
	allUsers = User.find({}, {
		fields: {
			services: 0
		}
	});
	if (allUsers) return allUsers;
	return this.ready();
});
