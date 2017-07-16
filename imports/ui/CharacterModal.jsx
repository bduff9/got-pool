'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, CardHeader, Control, Field, Icon, Modal, ModalBackground, ModalClose, ModalContent, Title } from 'bloomer';

const pointArr = [1, 2, 3, 4, 5, 6, 7];

const CharacterModal = ({ character, picks, closeModal, setPoints }) => {
	const _getPointUsed = point => {
		return picks.filter(pick => pick.points === point)[0];
	};

	const _getCharacterUsed = () => {
		return picks.filter(pick => pick.character_id === character._id)[0];
	};

	return (
		<Modal isActive={character}>
			<ModalBackground onClick={closeModal} />
			<ModalContent>
				<Card>
					<CardHeader>
						<Title size="1" hasTextAlign="centered">{character.name}</Title>
					</CardHeader>
					<CardContent>
						{character.isAlive ? (
							<Field hasAddons="centered">
								{pointArr.map(num => {
									const pointUsed = _getPointUsed(num),
											characterUsed = _getCharacterUsed(),
											bothUsed = pointUsed && characterUsed && pointUsed._id === characterUsed._id,
											actionMode = (bothUsed ? 'delete' : (characterUsed ? 'update' : 'add'));
									return (
										<Control key={`button${num}`}>
											<Button disabled={!!pointUsed && !bothUsed} isActive={!!bothUsed} isColor="primary" onClick={setPoints.bind(null, character._id, num, actionMode)}>
												{num}
												{bothUsed ? (
													<Icon isSize="small" hasTextColor="success">
														&nbsp; <i className="fa fa-check" />
													</Icon>
												)
													:
													null
												}
											</Button>
										</Control>
									);
								})}
							</Field>
						)
							:
							<Title size="3">Dead</Title>
						}
					</CardContent>
				</Card>
			</ModalContent>
			<ModalClose onClick={closeModal} />
		</Modal>
	);
};

CharacterModal.propTypes = {
	character: PropTypes.object.isRequired,
	picks: PropTypes.array.isRequired,
	closeModal: PropTypes.func.isRequired,
	setPoints: PropTypes.func.isRequired
};

export default CharacterModal;
