'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { displayError } from '../globals.js';
import { writeLog } from '../collections/gotlogs';

const NotFound = ({ location }) => {

	writeLog.call({ userId: Meteor.userId(), action: '404', message: location.pathname }, displayError);

	return (
		<div className="col-xs not-found-wrapper">
			<Helmet title="Not Found" />
			<div className="white-box col-xs-12 col-sm-10 col-md-8 col-xl-6">
				<div className="row">
					<div className="text-xs-center col-xs-12">
						<h1>What have you done?!</h1>
					</div>
				</div>
				<div className="row">
					<div className="text-xs-center col-xs-12" style={{ marginBottom: '25px' }}>
						<img src={''} alt="Okay, this part was us." className="not-found-img" />
					</div>
				</div>
				<div className="row">
					<div className="text-xs-center col-xs-12">
						<h4>Something has gone wrong. It might be because of you. It might be because of us.
						Either way, this is awkward.</h4>
					</div>
				</div>
				<div className="row">
					<div className="text-xs-center col-xs-12">
						<Link to="/">Please click here to get us both out of this situation</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

NotFound.propTypes = {
	location: PropTypes.object.isRequired
};

export default NotFound;
