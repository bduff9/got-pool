'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Table } from 'bloomer';

import Loading from './Loading';
import GoTLog from '../collections/gotlogs';
import User from '../collections/users';

export default class AdminLogs extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			subscriptions: {
				logs: Meteor.subscribe('allLogs'),
				users: Meteor.subscribe('allUsers')
			}
		};
	}

	componentWillUnmount () {
		const { logs, users } = this.state.subscriptions;
		logs.stop();
		users.stop();
	}

	logs () {
		return GoTLog.find({}, { sort: { when: -1 }}).fetch();
	}

	users () {
		return User.find({}).fetch();
	}

	render () {
		const { subscriptions } = this.state,
				{ logs, users } = subscriptions,
				pageReady = logs.ready() && users.ready();
		return (
			<Loading isLoading={!pageReady}>
				<Helmet title="View Logs" />
				<Table>
					<thead>
						<tr>
							<th>Action</th>
							<th>User</th>
							<th>When</th>
							<th>Message</th>
						</tr>
					</thead>
					<tbody>
						{this.logs().map(log => (
							<tr key={`log${log._id}`}>
								<td>{log.action}</td>
								<td>{`${log.getUser().first_name} ${log.getUser().last_name}`}</td>
								<td>{log.when.toString()}</td>
								<td>{log.message}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Loading>
		);
	}
}

AdminLogs.propTypes = {};
