'use strict';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Column, Columns } from 'bloomer';

import { displayError } from '../globals';
import { addPick, deletePick, updatePick } from '../collections/picks';
import Loading from './Loading';
import CharacterCard from './CharacterCard';
import CharacterModal from './CharacterModal';
import Character from '../collections/characters';
import Pick from '../collections/picks';

export default class MakePicks extends TrackerReact(Component) {
	constructor (props) {
		super();
		this.state = {
			currentModal: null,
			subscriptions: {
				characters: Meteor.subscribe('allCharacters'),
				picks: Meteor.subscribe('myPicks')
			}
		};
		this._closeModal = this._closeModal.bind(this);
		this._pickCharacter = this._pickCharacter.bind(this);
		this._setPoints = this._setPoints.bind(this);
	}

	componentWillUnmount () {
		const { characters, picks } = this.state.subscriptions;
		characters.stop();
		picks.stop();
	}

	characters () {
		return Character.find({}, { sort: { name: 1 }}).fetch();
	}

	picks () {
		return Pick.find({}, { sort: { points: 1 }}).fetch();
	}

	_closeModal (ev) {
		this.setState({ currentModal: null });
	}

	_pickCharacter (character, ev) {
		this.setState({ currentModal: character });
	}

	_setPoints (character_id, points, actionMode, ev) {
		const characterObj = { character_id, points };
		switch (actionMode) {
			case 'add':
				addPick.call(characterObj, displayError);
				break;
			case 'update':
				updatePick.call(characterObj, displayError);
				break;
			case 'delete':
				deletePick.call(characterObj, displayError);
				break;
			default:
				console.error('Invalid action mode passed', actionMode);
				break;
		}
		this.setState({ currentModal: null });
	}

	render () {
		const { currentModal, subscriptions } = this.state,
				{ characters, picks } = subscriptions,
				pageReady = characters.ready() && picks.ready();
		return (
			<Loading isLoading={!pageReady}>
				<Helmet title="Make Picks" />
				<Columns isCentered isMultiline>
					{this.characters().map(character => (
						<Column isSize={{ default: '1/4', tablet: '1/2', mobile: 'full' }} key={`character${character._id}`}>
							<CharacterCard character={character} picks={this.picks()} pickCharacter={this._pickCharacter.bind(null, character)} />
						</Column>
					))}
					{currentModal ? <CharacterModal character={currentModal} picks={this.picks()} closeModal={this._closeModal} setPoints={this._setPoints} /> : null}
				</Columns>
			</Loading>
		);
	}
}

MakePicks.propTypes = {};
