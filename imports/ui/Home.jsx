'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Table } from 'bloomer';

import Loading from './Loading';
import User from '../collections/users';

export default class Home extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			subscriptions: {
				characters: Meteor.subscribe('allCharacters'),
				picks: Meteor.subscribe('allPicks'),
				users: Meteor.subscribe('allUsers')
			}
		};
	}

	componentWillUnmount () {
		const { characters, picks, users } = this.state.subscriptions;
		characters.stop();
		picks.stop();
		users.stop();
	}

	characters () {
		return User.find({}).fetch();
	}

	picks () {
		return User.find({}).fetch();
	}

	users () {
		return User.find({}).fetch();
	}

	render () {
		const { subscriptions } = this.state,
				{ characters, picks, users } = subscriptions,
				pageReady = characters.ready() && picks.ready() && users.ready();
		return (
			<Loading isLoading={!pageReady}>
				<Table isBordered isStriped>
					<thead>
						<tr>
							<th>Player</th>
							<th>Picks</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{this.users().map(user => {
							return (
								<tr key={`user${user._id}`}>
									<td>{`${user.first_name} ${user.last_name}`}</td>
									<td>
										{user.getPicks().map(pick => {
											const character = pick.getCharacter();
											return <div className={character.isAlive ? null : 'dead'} key={`pick${pick._id}`}>{pick.points} {character.name}</div>;
										})}
									</td>
									<td>{user.getPoints()}</td>
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
