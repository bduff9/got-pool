/* globals Assets */
'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Class } from 'meteor/jagi:astronomy';

/**
 * Schema
 */
const Characters = new Mongo.Collection('characters');
const Character = Class.create({
	name: 'Character',
	collection: Characters,
	secured: true,
	fields: {
		name: String,
		image: String,
		isAlive: {
			type: Boolean,
			default: true
		}
	},
	helpers: {},
	indexes: {}
});

export default Character;

/**
 * Methods
 */
export const loadCharacters = new ValidatedMethod({
	name: 'Team.insert',
	validate: new SimpleSchema({}).validator(),
	run () {
		if (Meteor.isServer) {
			const data = Assets.getText('GotCharacters.json'),
					charactersObj = JSON.parse(data);
			charactersObj.characters.forEach(characterObj => {
				let character = new Character(characterObj);
				character.save();
				console.log('Character inserted: ', characterObj.name);
			});
		}
	}
});
export const loadCharactersSync = Meteor.wrapAsync(loadCharacters.call, loadCharacters);
