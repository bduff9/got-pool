'use strict';

import Character from '../imports/collections/characters';

if (Character.find().count() === 0) {
	console.log('Begin populating characters...');
	//TODO: load json file into db
	console.log('Populating characters completed!');
}
