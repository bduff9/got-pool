'use strict';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/collections/characters';
import '../imports/collections/gotlogs';
import '../imports/collections/picks';
import '../imports/collections/users';

Meteor.startup(() => {

	Accounts.onCreateUser((options, user) => {
		const { email, profile } = options,
				{ first_name, last_name } = profile;
		user.email = email;
		user.first_name = first_name;
		user.last_name = last_name;
		return user;
	});

});
