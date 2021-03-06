'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Button, Help, Icon, Table } from 'bloomer';

import { POOL_COST } from '../constants';
import { displayError } from '../globals';
import Loading from './Loading';
import User, { changePaidAmount, deleteUser, markAllSubmitted, toggleAdmin, toggleSubmitted } from '../collections/users';

export default class AdminUsers extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			subscriptions: {
				users: Meteor.subscribe('adminUsers')
			}
		};
	}

	componentWillUnmount () {
		const { users } = this.state.subscriptions;
		users.stop();
	}

	users () {
		return User.find({}, { sort: { first_name: 1, last_name: 1 }}).fetch();
	}

	_deleteUser (user_id, ev) {
		if (confirm('Are you sure you want to delete this user?')) deleteUser.call({ user_id }, displayError);
	}

	_markAllSubmitted (ev) {
		markAllSubmitted.call({}, displayError);
	}

	_toggleAdmin (user_id, ev) {
		toggleAdmin.call({ user_id }, displayError);
	}

	_togglePaid (user_id, ev) {
		changePaidAmount.call({ user_id, change: POOL_COST }, displayError);
	}

	_toggleSubmitted (user_id, ev) {
		toggleSubmitted.call({ user_id }, displayError);
	}

	render () {
		const { subscriptions } = this.state,
				{ users } = subscriptions,
				pageReady = users.ready();
		return (
			<Loading isLoading={!pageReady}>
				<Helmet title="User Admin" />
				<Button isColor="danger" onClick={this._markAllSubmitted}>Mark All Submitted</Button>
				<br />
				<Table>
					<thead>
						<tr>
							<th>User</th>
							<th>Paid</th>
							<th>Submitted</th>
							<th>Admin</th>
							<th>Password</th>
						</tr>
					</thead>
					<tbody>
						{this.users().map(user => (
							<tr key={`log${user._id}`}>
								<td>
									{`${user.first_name} ${user.last_name}`}
									{user.is_admin || user.has_submitted ? null : <Icon icon="times" hasTextColor="danger" className="clickable" onClick={this._deleteUser.bind(null, user._id)} />}
								</td>
								<td>
									<Icon icon="money" hasTextColor={user.owes === user.paid ? 'success' : 'danger'} className="clickable" onClick={this._togglePaid.bind(null, user._id)} />
								</td>
								<td>
									<Icon icon="users" hasTextColor={user.has_submitted ? 'success' : 'danger'} className="clickable" onClick={this._toggleSubmitted.bind(null, user._id)} />
								</td>
								<td>
									{Meteor.userId() !== user._id ? <Icon icon="key" hasTextColor={user.is_admin ? 'success' : 'danger'} className="clickable" onClick={this._toggleAdmin.bind(null, user._id)} /> : null}
								</td>
								<td>
									<Help title={user.if_forgot}>{user.if_forgot.replace(/./g, '*')}</Help>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Loading>
		);
	}
}

AdminUsers.propTypes = {};
