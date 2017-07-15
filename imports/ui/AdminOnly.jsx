'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AdminOnly = ({ loggingIn, authenticated, component, ...rest }) => (
	<Route {...rest} render={(props) => {
		if (loggingIn) return <div></div>;
		//TODO: check if admin or not
		return authenticated ?
			(React.createElement(component, { ...props, loggingIn, authenticated })) :
			(<Redirect to="/login" />);
	}} />
);

AdminOnly.propTypes = {
	loggingIn: PropTypes.bool,
	authenticated: PropTypes.bool,
	component: PropTypes.func,
};

export default AdminOnly;
