import { Meteor } from 'meteor/meteor';

//import '../imports/collections/characters';
//import '../imports/collections/gotlogs';
//import '../imports/collections/picks';
//import '../imports/collections/users';

Meteor.startup(() => {
	process.env.MONGO_URL = 'mongodb://localhost:3001/got-pool';
});
