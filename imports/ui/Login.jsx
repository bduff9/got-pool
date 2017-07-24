'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Container } from 'bloomer';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default class Login extends Component {
	constructor (props) {
		// 2017-07-24: Commented out isLogin refs since registration is over
		//const { location } = props;
		super();
		this.state = {
			isLogin: true//location.pathname === '/login'
		};
		this._toggleLogin = this._toggleLogin.bind(this);
	}

	_toggleLogin (ev) {
		//const { isLogin } = this.state;
		//this.setState({ isLogin: !isLogin });
	}

	render () {
		const { isLogin } = this.state;
		return (
			<Container>
				{isLogin ? <Helmet title="Login" /> : <Helmet title="Register" />}
				{isLogin ? <LoginForm goRegister={this._toggleLogin} /> : <RegistrationForm goLogin={this._toggleLogin} />}
			</Container>
		);
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired
};
