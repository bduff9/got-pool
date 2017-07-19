'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Class } from 'meteor/jagi:astronomy';

import { ACTIONS } from '../constants';
import User from './users';

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
	helpers: {
		getUser () {
			const user = User.findOne(this.user_id);
			if (!user) return {};
			return user;
		}
	},
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
		message: { type: String, label: 'Message', optional: true },
		userId: { type: String, label: 'User ID', optional: true }
	}).validator(),
	run ({ action, message, userId }) {
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
