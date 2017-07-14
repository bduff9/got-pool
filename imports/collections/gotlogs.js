'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Class, Enum } from 'meteor/jagi:astronomy';

export const Action = Enum.create({
	name: 'Action',
	identifiers: {
		'404': 1,
		'CHAT': 2,
		'CHAT_HIDDEN': 3,
		'CHAT_OPENED': 4,
		'LOGIN': 5,
		'LOGOUT': 6,
		'MESSAGE': 7,
		'PAID': 7,
		'REGISTER': 8,
		'SUBMIT_PICKS': 9,
		'SURVIVOR_PICK': 10
	}
});

const GoTLogs = new Mongo.Collection('gotlogs');
const GoTLog = Class.create({
	name: 'GotLog',
	collection: GoTLogs,
	secured: true,
	fields: {
		action: {
			type: Action
		},
		when: Date,
		message: {
			type: String,
			optional: true
		},
		user_id: {
			type: String,
			optional: true
		}
	},
	helpers: {},
	indexes: {}
});

export default GoTLog;
