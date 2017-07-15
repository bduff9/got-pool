'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const AppNavigation = ({ authenticated }) => (
	authenticated ? (
		<div>Nav Bar</div>
	)
		:
		null
);

AppNavigation.propTypes = {
	authenticated: PropTypes.bool
};

export default AppNavigation;
