'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Icon, Notification } from 'bloomer';

import { displayError } from '../globals';
import { writeLog } from '../collections/gotlogs';

const Logout = ({ authenticated }) => {
	const userId = Meteor.userId();
	if (authenticated) {
		Meteor.logout((err) => {
			writeLog.call({ userId: userId, action: 'LOGOUT', message: location.pathname }, displayError);
		});
	}

	return (
		<div>
			<Helmet title="Goodbye" />
			{authenticated ? (
				<div>
					<Icon isSize="medium" isAlign="left">
						<i className="fa fa-spin fa-spinner" aria-hidden="true"/>
					</Icon>
					Logging you out...
				</div>
			)
				:
				(
					<Notification isColor="success">You are now logged out! <Link to="/login">Click here to sign back in.</Link></Notification>
				)
			}
		</div>
	);
};

Logout.propTypes = {
	authenticated: PropTypes.bool
};

export default Logout;
