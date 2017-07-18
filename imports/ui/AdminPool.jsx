'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Button, Table } from 'bloomer';

import { displayError } from '../globals';
import Loading from './Loading';
import Character, { toggleCharacterAlive } from '../collections/characters';
export default class AdminPool extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			subscriptions: {
				characters: Meteor.subscribe('allCharacters')
			}
		};
	}

	componentWillUnmount () {
		const { characters } = this.state.subscriptions;
		characters.stop();
	}

	characters () {
		return Character.find({}, { sort: { name: 1 }}).fetch();
	}

	_toggleStatus (character_id, ev) {
		toggleCharacterAlive.call({ character_id }, displayError);
	}

	render () {
		const { subscriptions } = this.state,
				{ characters } = subscriptions,
				pageReady = characters.ready();
		return (
			<Loading isLoading={!pageReady}>
				<Helmet title="Update Pool" />
				<Table>
					<thead>
						<tr>
							<th>Character</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.characters().map(character => (
							<tr key={`character${character._id}`}>
								<td className={(character.isAlive ? '' : 'dead')}>{character.name}</td>
								<td>
									<Button isColor={character.isAlive ? 'danger' : 'success'} onClick={this._toggleStatus.bind(null, character._id)}>
										{character.isAlive ? 'Mark Dead' : 'Mark Alive'}
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Loading>
		);
	}
}

AdminPool.propTypes = {};
