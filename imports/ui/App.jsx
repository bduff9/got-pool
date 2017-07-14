'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Loading from './Loading.jsx';
import Routes from './Routes.jsx';

export default class App extends Component {

	constructor (props) {
		super();
		this.state = {};
	}

	render () {
		const { userLoaded } = this.props,
				appLoaded = userLoaded || (!Meteor.userId() && !Meteor.loggingIn());
		return (
			<div className="row">
			<Helmet
				htmlAttributes={{ lang: 'en', 'amp': undefined }}
				title="Welcome"
				titleTemplate="%s | GoT Death Pool"
				link={[{ rel: 'icon', sizes: '16x16 32x32', href: '/favicon.ico?v=1' }]}
				meta={[{ 'charset': 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=edge' }, { 'name': 'viewport', 'content': 'width=device-width, initial-scale=1, user-scalable=no' }]} />
			<Loading isLoaded={appLoaded}>
				<Routes key={Date.now()} />
			</Loading>
		</div>
		);
	}
}

App.propTypes = {
	userLoaded: PropTypes.bool.isRequired
};
