'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { composeWithTracker } from 'react-komposer';
import { Section } from 'bloomer';

import AdminLogs from './AdminLogs';
import AdminOnly from './AdminOnly';
import AdminPool from './AdminPool';
import AppNavigation from './AppNavigation';
import Authenticated from './Authenticated';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import MakePicks from './MakePicks';
import NotFound from './NotFound';
import Unauthenticated from './Unauthenticated';

const App = appProps => (
	<Router>
		<div>
			<AppNavigation {...appProps} />
			<Section hasTextAlign="centered">
				<Helmet
					htmlAttributes={{ lang: 'en', 'amp': undefined }}
					title="Welcome"
					titleTemplate="%s | GoT Death Pool"
					link={[{ rel: 'icon', sizes: '16x16 32x32', href: '/favicon.ico?v=1' }]}
					meta={[{ 'charset': 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }, { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no' }]} />
				<Switch>
					<Unauthenticated exact path="/login" component={Login} {...appProps} />
					<Unauthenticated exact path="/register" component={Login} {...appProps} />
					<Logout exact path="/logout" {...appProps} />
					<Authenticated exact path="/" component={Home} {...appProps} />
					<Authenticated exact path="/picks/make" component={MakePicks} {...appProps} />
					<AdminOnly exact path="/admin/pool" component={AdminPool} {...appProps} />
					<AdminOnly exact path="/admin/logs" component={AdminLogs} {...appProps} />
					<Route component={NotFound} {...appProps} />
				</Switch>
			</Section>
		</div>
	</Router>
);

App.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	loggingIn: PropTypes.bool.isRequired
};


const composer = (props, onData) => {
	const loggingIn = Meteor.loggingIn();
	onData(null, {
		loggingIn,
		authenticated: !loggingIn && !!Meteor.userId(),
	});
};

export default composeWithTracker(composer)(App);
