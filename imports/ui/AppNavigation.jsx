'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { NavLink } from 'react-router-dom';
import { Container, Hero, HeroBody, HeroHeader, Nav, NavItem, NavLeft, NavRight } from 'bloomer';

import RulesModal from './RulesModal';
import User from '../collections/users';

export default class AppNavigation extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			isRulesOpen: false,
			subscriptions: {
				users: Meteor.subscribe('myUser')
			}
		};
		this._toggleRules = this._toggleRules.bind(this);
	}

	componentWillUnmount () {
		this.state.subscriptions.users.stop();
	}

	users () {
		return User.find({ _id: Meteor.userId() }).fetch();
	}

	_toggleRules (ev) {
		const { isRulesOpen } = this.state;
		ev.preventDefault();
		this.setState({ isRulesOpen: !isRulesOpen });
		return false;
	}

	render () {
		const { authenticated } = this.props,
				{ isRulesOpen } = this.state,
				currentUser = this.users()[0] || {};
		return (
			<Hero isColor="primary" isSize="small">
				<HeroHeader>
					<Nav>
						<NavLeft>
							<NavItem isBrand>
								<span className="brand" style={{ fontFamily: 'got' }}>&nbsp; #</span>
								<span className="title" style={{ fontFamily: 'got' }}>Death Pool</span>
							</NavItem>
						</NavLeft>
						{authenticated ? (
							<NavRight isMenu>
								<NavLink className="nav-item" to="/" exact>Home</NavLink>
								<NavItem href="javascript:void(0);" onClick={this._toggleRules}>Rules</NavItem>
								<NavLink className="nav-item" to="/picks/make" exact>Make Picks</NavLink>
								{currentUser.is_admin ? <NavLink className="nav-item" to="/admin/pool" exact>Update Pool</NavLink> : null}
								{currentUser.is_admin ? <NavLink className="nav-item" to="/admin/logs" exact>View Logs</NavLink> : null}
								<NavLink className="nav-item" to="/logout" exact>Log Out</NavLink>
							</NavRight>
						)
							:
							null
						}
					</Nav>
				</HeroHeader>
				{!authenticated ? (
					<HeroBody>
						<Container hasTextAlign="centered">
							<img src="/images/gameOfThronesBckgrd.jpg" />
						</Container>
					</HeroBody>
				)
					:
					null
				}
				{isRulesOpen ? <RulesModal toggleRules={this._toggleRules} /> : null}
			</Hero>
		);
	}
}

AppNavigation.propTypes = {
	authenticated: PropTypes.bool
};
