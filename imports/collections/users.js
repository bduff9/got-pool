'use strict';

import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';

import Pick from './picks';

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
