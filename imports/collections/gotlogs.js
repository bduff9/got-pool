'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Class, Enum } from 'meteor/jagi:astronomy';

import { ACTIONS } from '../constants';

/**
 * Schema
 */
const GoTLogs = new Mongo.Collection('gotlogs');
const GoTLog = Class.create({
	name: 'GotLog',
	collection: GoTLogs,
	secured: true,
	fields: {
		action: {
			type: String,
			validators: [{ type: 'choice', param: ACTIONS }]
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

/**
 * Methods
 */
export const writeLog = new ValidatedMethod({
	name: 'GoTLog.insert',
	validate: new SimpleSchema({
		action: { type: String, label: 'Action', allowedValues: ACTIONS },
		message: { type: String, label: 'Message' },
		userId: { type: String, optional: true, label: 'User ID' }
	}).validator(),
	run ({ action, message, userId }) {
		if (action !== '404' && !userId) throw new Meteor.Error('GoTLog.insert.not-signed-in', 'You must be logged in to write to the log');
		if (Meteor.isServer) {
			let logEntry = new GoTLog({
				action,
				when: new Date(),
				message,
				user_id: userId
			});
			logEntry.save();
		}
	}
});
export const writeLogSync = Meteor.wrapAsync(writeLog.call, writeLog);
