'use strict';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import GoTLog from '../collections/gotlogs';
import AdminLogs from './AdminLogs';
import AdminUsers from './AdminUsers';
import AuthedLayout from './AuthedLayout';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import MakePicks from './MakePicks';
import NotFound from './NotFound';

function requireAuth (nextState, replace) {
	if (!Meteor.userId()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

function requireNoAuth (nextState, replace) {
	const { location } = nextState;
	if (Meteor.userId()) {
		if (location.state && location.state.nextPathname) {
			replace({
				pathname: location.state.nextPathname,
				state: { nextPathname: null }
			});
		} else {
			replace({
				pathname: '/'
			});
		}
	}
}

function validateUser (nextState, replace) {
	const { done_registering } = Meteor.user();
	if (!done_registering) {
		replace({
			pathname: '/users/create'
		});
	}
}

function noValidateUser (nextState, replace) {
	const { done_registering } = Meteor.user();
	if (done_registering) {
		replace({
			pathname: '/'
		});
	}
}

function verifyAdmin (nextState, replace) {
	const user = Meteor.user();
	if (!user.is_admin) {
		replace({
			pathname: '/'
		});
	}
}

function logOut (nextState, replace) {
	const { location } = nextState,
			user = Meteor.user();
	if (Meteor.userId()) {
		Meteor.logout((err) => {
			const gotLog = new GoTLog();
			gotLog.user_id = user._id;
			gotLog.action = 'LOGOUT';
			gotLog.message = `${user.first_name} ${user.last_name} successfully signed out`;
			gotLog.save();
		});
	} else if (!location.state || !location.state.isLogout) {
		replace({
			pathname: '/login'
		});
	}
}

const Routes = () => (
	<Router history={browserHistory}>
		<Route path="/login" component={Login} onEnter={requireNoAuth} />
		<Route path="/logout" component={Logout} onEnter={logOut} />
		<Route path="/" component={AuthedLayout} onEnter={requireAuth}>
			<IndexRoute component={Home} onEnter={validateUser} />
			<Route path="/picks" onEnter={validateUser}>
				<Route path="make" component={MakePicks} />
			</Route>
			<Route path="/admin" onEnter={verifyAdmin}>
				<Route path="users" component={AdminUsers} />
				<Route path="logs" component={AdminLogs} />
			</Route>
		</Route>
		<Route path="*" component={NotFound} />
	</Router>
);

export default Routes;
