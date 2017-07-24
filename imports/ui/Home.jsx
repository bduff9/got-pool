'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Link } from 'react-router-dom';
import { Table, Title } from 'bloomer';

import { getSortUsersByPoints } from '../globals';
import Loading from './Loading';
import Character from '../collections/characters';
import Pick from '../collections/picks';
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
		return Character.find({}).fetch();
	}

	picks () {
		return Pick.find({}).fetch();
	}

	users () {
		return User.find({}).fetch();
	}

	render () {
		const { subscriptions } = this.state,
				{ characters, picks, users } = subscriptions,
				currentUser = Meteor.user(),
				pageReady = characters.ready() && picks.ready() && users.ready(),
				charactersDead = this.characters().filter(character => !character.isAlive),
				sortUsersByPoints = getSortUsersByPoints(charactersDead.length),
				sortedUsers = this.users().map(user => Object.assign({ picks: user.getPicks(), points: user.getPoints() }, user)).sort(sortUsersByPoints);
		return (
			<Loading isLoading={!pageReady}>
				<Helmet title="Dashboard" />
				{currentUser.has_submitted ? (
					<Table isBordered isStriped>
						<thead>
							<tr>
								<th>Player</th>
								<th>Picks</th>
								<th>Score</th>
								<th className="is-hidden-mobile">Tiebreaker</th>
								<th className="is-hidden-mobile">Characters Died</th>
							</tr>
						</thead>
						<tbody>
							{sortedUsers.map(user => {
								return (
									<tr key={`user${user._id}`}>
										<td>{`${user.first_name} ${user.last_name}`}</td>
										<td>
											{user.picks.map(pick => {
												const character = pick.getCharacter();
												return <div className={character.isAlive ? null : 'dead'} key={`pick${pick._id}`}>{pick.points} {character.name}</div>;
											})}
										</td>
										<td>{user.points}</td>
										<td className="is-hidden-mobile">{user.tiebreaker}</td>
										<td className="is-hidden-mobile">{charactersDead.length}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)
					:
					<Title isSize="medium">Please <Link to="/picks/make">click here</Link> to make your picks before 8pm Sunday, July 22nd, 2017</Title>
				}
			</Loading>
		);
	}
}
