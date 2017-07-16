'use strict';

import { Meteor } from 'meteor/meteor';

import Pick from '../../imports/collections/picks';

Meteor.publish('allPicks', function () {
	let allPicks;
	if (!this.userId) return this.ready();
	allPicks = Pick.find({});
	if (allPicks) return allPicks;
	return this.ready();
});

Meteor.publish('myPicks', function () {
	let myPicks;
	if (!this.userId) return this.ready();
	myPicks = Pick.find({ user_id: this.userId });
	if (myPicks) return myPicks;
	return this.ready();
});
