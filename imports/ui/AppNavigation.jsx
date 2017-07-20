'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { NavLink } from 'react-router-dom';
import { Container, Hero, HeroBody, HeroHeader, HeroFooter, Icon, Nav, NavItem, NavCenter, NavLeft, NavRight, Title } from 'bloomer';

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
						<NavLeft isHidden="mobile">
							<NavItem isBrand >
								<Title isSize={3}># </Title>
								<Title isSize={5}>&nbsp; Death Pool</Title>
							</NavItem>
						</NavLeft>
						<NavCenter isHidden="tablet">
							<NavItem>
								<Title isSize={3} isPaddingless># </Title>
							</NavItem>
						</NavCenter>
						{authenticated ? (
							<NavRight isMenu isHidden="mobile">
								<NavLink className="nav-item" to="/" exact>Home</NavLink>
								<NavItem href="javascript:void(0);" onClick={this._toggleRules}>Rules</NavItem>
								<NavLink className="nav-item" to="/picks/make" exact>Make Picks</NavLink>
								{currentUser.is_admin ? <NavLink className="nav-item" to="/admin/pool" exact>Kills</NavLink> : null}
								{currentUser.is_admin ? <NavLink className="nav-item" to="/admin/logs" exact>Logs</NavLink> : null}
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
					<HeroFooter isHidden="tablet">
						<Nav>
							<NavLeft hasTextAlign="centered" >
								<NavLink className="nav-item" to="/" exact><Icon isSize="medium" icon='home' /></NavLink>
								<NavItem href="javascript:void(0);" onClick={this._toggleRules}><Icon isSize="medium" icon='question-circle-o' /></NavItem>
								<NavLink className="nav-item" to="/picks/make" exact><Icon icon='users' /></NavLink>
								<NavLink className="nav-item" to="/logout" exact><Icon isSize="medium" icon='sign-out' /></NavLink>
							</NavLeft>
						</Nav>
					</HeroFooter>
				}

				{isRulesOpen ? <RulesModal toggleRules={this._toggleRules} /> : null}
			</Hero>
		);
	}
}

AppNavigation.propTypes = {
	authenticated: PropTypes.bool
};
