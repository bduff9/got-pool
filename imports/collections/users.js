'use strict';

import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Class } from 'meteor/jagi:astronomy';

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
		}
	},
	helpers: {},
	indexes: {}
});

export default User;
