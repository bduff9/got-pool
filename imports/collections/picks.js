'use strict';

import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

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
	helpers: {},
	indexes: {}
});

export default Pick;
