'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardImage, Image, Media, MediaContent, MediaLeft, Tag, Title } from 'bloomer';

const CharacterCard = ({ character, pickCharacter, picks }) => {
	const used = picks.filter(pick => pick.character_id === character._id),
			isUsed = used.length === 1;
	return (
		<Card onClick={pickCharacter} style={{ cursor: 'pointer' }}>
			<CardImage>
				<Image className={character.isAlive ? null : 'dead'} isRatio="square" src={`/images/characters/${character.image}`} />
			</CardImage>
			<CardContent>
				<Media>
					{isUsed ? <MediaLeft><Tag isColor="danger">{used[0].points}</Tag></MediaLeft> : null}
					<MediaContent>
						<Title className={character.isAlive ? null : 'dead'} hasTextAlign="centered" isSize={3}>{character.name}</Title>
					</MediaContent>
				</Media>
			</CardContent>
		</Card>
	);
};

CharacterCard.propTypes = {
	character: PropTypes.object.isRequired,
	pickCharacter: PropTypes.func,
	picks: PropTypes.array
};

export default CharacterCard;
