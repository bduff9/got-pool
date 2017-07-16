'use strict';

import { Meteor } from 'meteor/meteor';

import Character from '../../imports/collections/characters';

Meteor.publish('allCharacters', function () {
	let allCharacters;
	if (!this.userId) return this.ready();
	allCharacters = Character.find({});
	if (allCharacters) return allCharacters;
	return this.ready();
});
