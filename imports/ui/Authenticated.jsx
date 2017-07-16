'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ authenticated, component, location, loggingIn, ...rest }) => (
	<Route {...rest} render={props => {
		if (loggingIn) return <div></div>;
		return authenticated ? (
			React.createElement(component, { ...props, location, loggingIn, authenticated })
		)
			:
			(
				<Redirect to={{ pathname: '/login', state: { nextPathname: location.pathname }}} />
			);
	}} />
);

Authenticated.propTypes = {
	authenticated: PropTypes.bool,
	component: PropTypes.func.isRequired,
	location: PropTypes.object,
	loggingIn: PropTypes.bool.isRequired
};

export default Authenticated;
