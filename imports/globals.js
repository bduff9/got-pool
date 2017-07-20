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