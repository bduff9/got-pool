'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'bloomer';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default class Login extends Component {
	constructor (props) {
		const { location } = props;
		super();
		this.state = {
			isLogin: location.pathname === '/login'
		};
		this._toggleLogin = this._toggleLogin.bind(this);
	}

	_toggleLogin (ev) {
		const { isLogin } = this.state;
		this.setState({ isLogin: !isLogin });
	}

	render () {
		const { isLogin } = this.state;
		return (
			<Container>
				{isLogin ? <LoginForm goRegister={this._toggleLogin} /> : <RegistrationForm goLogin={this._toggleLogin} />}
			</Container>
		);
	}
}

Login.propTypes = {
	location: PropTypes.object.isRequired
};
