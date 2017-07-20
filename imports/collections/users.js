'use strict';

import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { POOL_COST } from '../constants';
import { displayError } from '../globals';
import { writeLog } from '../collections/gotlogs';
import Pick from './picks';

/**
 * Schema
 */
const User = Class.create({
	name: 'User',
	collection: Meteor.users,
	secured: true,
	fields: {
		email: {
			type: String,
			validators: [{ type: 'email' }]
		},
		first_name: String,
		last_name: String,
		if_forgot: String,
		owes: {
			type: Number,
			default: POOL_COST
		},
		paid: {
			type: Number,
			default: 0
		},
		tiebreaker: {
			type: Number,
			default: 0
		},
		has_submitted: {
			type: Boolean,
			default: false
		},
		is_admin: {
			type: Boolean,
			default: false
		}
	},
	helpers: {
		getPicks () {
			const picks = Pick.find({ user_id: this._id }, { sort: { points: 1 }}).fetch();
			return picks;
		},
		getPoints () {
			const picks = this.getPicks(),
					dead = picks.filter(pick => !pick.getCharacter().isAlive);
			let points = dead.reduce((points, pick) => points + pick.points, 0);
			return points;
		}
	},
	indexes: {}
});

export default User;

/**
 * Methods
 */
export const changePaidAmount = new ValidatedMethod({
	name: 'Users.changePaidAmount',
	validate: new SimpleSchema({
		change: { type: Number, label: 'Amount Paid' },
		user_id: { type: String, label: 'User ID' }
	}).validator(),
	run ({ change, user_id }) {
		const currentUser = Meteor.user();
		const user = User.findOne(user_id);
		if (!this.userId) throw new Meteor.Error('Users.changePaidAmount.not-signed-in', 'You must be logged in to change paid amount');
		if (!currentUser.is_admin) throw new Meteor.Error('Users.changePaidAmount.not-an-admin', 'You must be an admin to change paid amount');
		user.paid += change;
		user.save();
		writeLog.call({ action: 'PAID', message: `Paid $${change}`, userId: user_id }, displayError);
	}
});
export const changePaidAmountSync = Meteor.wrapAsync(changePaidAmount.call, changePaidAmount);

export const deleteUser = new ValidatedMethod({
	name: 'Users.deleteUser',
	validate: new SimpleSchema({
		user_id: { type: String, label: 'User ID' }
	}).validator(),
	run ({ user_id }) {
		const currentUser = Meteor.user();
		if (!this.userId) throw new Meteor.Error('Users.deleteUser.not-signed-in', 'You must be logged in to delete a user');
		if (!currentUser.is_admin) throw new Meteor.Error('Users.deleteUser.not-an-admin', 'You must be an admin to delete a user');
		User.remove(user_id);
	}
});
export const deleteUserSync = Meteor.wrapAsync(deleteUser.call, deleteUser);

export const markAllSubmitted = new ValidatedMethod({
	name: 'Users.markAllSubmitted',
	validate: new SimpleSchema({}).validator(),
	run () {
		const currentUser = Meteor.user();
		const users = User.find({ has_submitted: false });
		if (!this.userId) throw new Meteor.Error('Users.markAllSubmitted.not-signed-in', 'You must be logged in to mark all submitted');
		if (!currentUser.is_admin) throw new Meteor.Error('Users.markAllSubmitted.not-an-admin', 'You must be an admin to mark all submitted');
		users.forEach(user => {
			user.has_submitted = true;
			user.save();
			writeLog.call({ action: 'SUBMIT_PICKS', userId: user._id }, displayError);
		});
	}
});
export const markAllSubmittedSync = Meteor.wrapAsync(markAllSubmitted.call, markAllSubmitted);

export const submitPicks = new ValidatedMethod({
	name: 'Users.submitPicks',
	validate: new SimpleSchema({
		tiebreaker: { type: Number, label: 'Tiebreaker Score' }
	}).validator(),
	run ({ tiebreaker }) {
		const user = User.findOne(this.userId);
		if (!this.userId) throw new Meteor.Error('Users.submitPicks.not-signed-in', 'You must be logged in to submit picks');
		user.tiebreaker = tiebreaker;
		user.has_submitted = true;
		user.save();
	}
});
export const submitPicksSync = Meteor.wrapAsync(submitPicks.call, submitPicks);

export const toggleAdmin = new ValidatedMethod({
	name: 'Users.toggleAdmin',
	validate: new SimpleSchema({
		user_id: { type: String, label: 'User ID' }
	}).validator(),
	run ({ user_id }) {
		const currentUser = Meteor.user();
		const user = User.findOne(user_id);
		if (!this.userId) throw new Meteor.Error('Users.toggleAdmin.not-signed-in', 'You must be logged in to toggle admin');
		if (!currentUser.is_admin) throw new Meteor.Error('Users.toggleAdmin.not-an-admin', 'You must be an admin to toggle admin');
		user.is_admin = !user.is_admin;
		user.save();
	}
});
export const toggleAdminSync = Meteor.wrapAsync(toggleAdmin.call, toggleAdmin);

export const toggleSubmitted = new ValidatedMethod({
	name: 'Users.toggleSubmitted',
	validate: new SimpleSchema({
		user_id: { type: String, label: 'User ID' }
	}).validator(),
	run ({ user_id }) {
		const currentUser = Meteor.user();
		const user = User.findOne(user_id);
		if (!this.userId) throw new Meteor.Error('Users.toggleSubmitted.not-signed-in', 'You must be logged in to toggle submitted');
		if (!currentUser.is_admin) throw new Meteor.Error('Users.toggleSubmitted.not-an-admin', 'You must be an admin to toggle submitted');
		user.has_submitted = !user.has_submitted;
		user.save();
		if (user.has_submitted) writeLog.call({ action: 'SUBMIT_PICKS', userId: user_id }, displayError);
	}
});
export const toggleSubmittedSync = Meteor.wrapAsync(toggleSubmitted.call, toggleSubmitted);
