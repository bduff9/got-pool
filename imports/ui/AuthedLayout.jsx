'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const AuthedLayout = ({ children }) => {
	return (
		<div>
			Authed Layout
			{children}
		</div>
	);
};

AuthedLayout.propTypes = {
	children: PropTypes.array
};

export default AuthedLayout;
