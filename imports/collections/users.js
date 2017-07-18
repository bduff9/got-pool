'use strict';

import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
		owes: {
			type: Number,
			default: 0
		},
		paid: {
			type: Number,
			default: 0
		},
		tiebreaker: {
			type: Number,
			optional: true
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
