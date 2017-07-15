'use strict';

import Character, { loadCharactersSync } from '../imports/collections/characters';

if (Character.find().count() === 0) {
	console.log('Begin populating characters...');
	loadCharactersSync({});
	console.log('Populating characters completed!');
}
