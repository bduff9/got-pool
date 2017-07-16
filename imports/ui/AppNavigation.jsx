'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Container, Hero, HeroBody, HeroHeader, Nav, NavItem, NavLeft, NavRight } from 'bloomer';

const AppNavigation = ({ authenticated }) => (
	<Hero isColor="primary" isSize="small">
		<HeroHeader>
			<Nav>
				<NavLeft>
					<NavItem isBrand>
						<img src="/images/banner.jpg" />
						<span style={{ fontFamily: 'Game of Thrones' }}>&nbsp; # Death Pool</span>
					</NavItem>
				</NavLeft>
				{authenticated ? (
					<NavRight isMenu>
						<NavLink className="nav-item" to="/" exact>Home</NavLink>
						<NavLink className="nav-item" to="/picks/make" exact>Make Picks</NavLink>
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
	</Hero>
);

AppNavigation.propTypes = {
	authenticated: PropTypes.bool
};

export default AppNavigation;
