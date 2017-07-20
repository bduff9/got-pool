'use strict';

import { Meteor } from 'meteor/meteor';

import User from '../../imports/collections/users';

Meteor.publish('adminUsers', function () {
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

Meteor.publish('allUsers', function () {
	let allUsers;
	if (!this.userId) return this.ready();
	allUsers = User.find({}, {
		fields: {
			if_forgot: 0,
			services: 0
		}
	});
	if (allUsers) return allUsers;
	return this.ready();
});

Meteor.publish('myUser', function () {
	let myUser;
	if (!this.userId) return this.ready();
	myUser = User.find({ _id: this.userId }, {
		fields: {
			services: 0
		}
	});
	if (myUser) return myUser;
	return this.ready();
});
