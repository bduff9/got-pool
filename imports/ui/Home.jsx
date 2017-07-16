'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Table } from 'bloomer';

import Loading from './Loading';
import User from '../collections/users';

export default class Home extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			subscription: {
				users: Meteor.subscribe('allUsers')
			}
		};
	}

	componentWillUnmount () {
		this.state.subscription.users.stop();
	}

	users () {
		return User.find({}).fetch();
	}

	render () {
		const { subscription } = this.state,
				{ users } = subscription,
				pageReady = users.ready();
		return (
			<Loading isLoading={!pageReady}>
				<Table isBordered isStriped>
					<thead>
						<tr>
							<th>Player</th>
						</tr>
					</thead>
					<tbody>
						{this.users().map(user => {
							return (
								<tr key={`user${user._id}`}>
									<td>{`${user.first_name} ${user.last_name}`}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Loading>
		);
	}
}

Home.propTypes = {};
