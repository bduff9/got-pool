'use strict';

import { Bert } from 'meteor/themeteorchef:bert';

export const displayError = (err, opts = { title: err && err.reason, type: 'danger' }) => {
	if (!err) return;
	if (!opts.title) {
		opts.title = 'Missing error title!';
		console.error(err);
	}
	Bert.alert(opts);
};

export const getFormControlOutlineColor = ({ hasError, isTouched }) => {
	if (!isTouched) return '';
	if (hasError) return 'danger';
	return 'success';
};

/**
 * Function that returns a sort function (-1 means user1 is winning, 1 means user2 is winning, 0 means tied)
 * @param {Number} charactersDead The total characters dead
 */
export const getSortUsersByPoints = charactersDead => (user1, user2) => {
	let tb1, tb2;
	// First, sort by points
	if (user1.points > user2.points) return -1;
	if (user1.points < user2.points) return 1;
	// Next, sort by tiebreakers (if one person is over, they come second)
	tb1 = charactersDead - user1.tiebreaker;
	tb2 = charactersDead - user2.tiebreaker;
	if (tb1 >= 0 && tb2 < 0) return -1;
	if (tb1 < 0 && tb2 >= 0) return 1;
	// If both are over/under, take the abs value and then the lower one comes first
	tb1 = Math.abs(tb1);
	tb2 = Math.abs(tb2);
	if (tb1 < tb2) return -1;
	if (tb1 > tb2) return 1;
	// Finally, they are equal
	return 0;
};
