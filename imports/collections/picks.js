'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Character from './characters';

/**
 * Schema
 */
const Picks = new Mongo.Collection('picks');
const Pick = Class.create({
	name: 'Pick',
	collection: Picks,
	secured: true,
	fields: {
		user_id: String,
		character_id: String,
		points: {
			type: Number,
			validators: [{ type: 'and', param: [{ type: 'gte', param: 1 }, { type: 'lte', param: 7 }]} ]
		}
	},
	helpers: {
		getCharacter () {
			const character = Character.findOne(this.character_id);
			if (!character) return {};
			return character;
		}
	},
	indexes: {}
});

export default Pick;

/**
 * Methods
 */
export const addPick = new ValidatedMethod({
	name: 'Picks.addPick',
	validate: new SimpleSchema({
		character_id: { type: String, label: 'Character ID' },
		points: { type: Number, label: 'Points', min: 1, max: 7 }
	}).validator(),
	run ({ character_id, points }) {
		const pick = new Pick({ character_id, points, user_id: this.userId });
		if (!this.userId) throw new Meteor.Error('not-signed-in', 'You are not signed in');
		pick.save();
	}
});

export const deletePick = new ValidatedMethod({
	name: 'Picks.deletePick',
	validate: new SimpleSchema({
		character_id: { type: String, label: 'Character ID' },
		points: { type: Number, label: 'Points', min: 1, max: 7 }
	}).validator(),
	run ({ character_id, points }) {
		if (!this.userId) throw new Meteor.Error('not-signed-in', 'You are not signed in');
		Pick.remove({ character_id, points, user_id: this.userId });
	}
});

export const updatePick = new ValidatedMethod({
	name: 'Picks.insertPick',
	validate: new SimpleSchema({
		character_id: { type: String, label: 'Character ID' },
		points: { type: Number, label: 'Points', min: 1, max: 7 }
	}).validator(),
	run ({ character_id, points }) {
		const pick = Pick.findOne({ character_id, user_id: this.userId });
		if (!this.userId) throw new Meteor.Error('not-signed-in', 'You are not signed in');
		pick.points = points;
		pick.save();
	}
});
