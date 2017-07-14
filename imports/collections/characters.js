'use strict';

import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

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
