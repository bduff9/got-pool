'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Unauthenticated = ({ loggingIn, authenticated, component, ...rest }) => (
	<Route {...rest} render={(props) => {
		if (loggingIn) return <div></div>;
		return !authenticated ?
			(React.createElement(component, { ...props, loggingIn, authenticated })) :
			(<Redirect to="/" />);
	}} />
);

Unauthenticated.propTypes = {
	loggingIn: PropTypes.bool,
	authenticated: PropTypes.bool,
	component: PropTypes.func,
};

export default Unauthenticated;
