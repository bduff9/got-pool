'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardBody, ModalCardTitle } from 'bloomer';

const RulesModal = ({ toggleRules }) => (
	<Modal isActive>
		<ModalBackground onClick={toggleRules} />
		<ModalCard>	
			<ModalCardHeader>
				<ModalCardTitle style={{ fontFamily: 'got' }}>Rules</ModalCardTitle>
				
			</ModalCardHeader>
			<ModalCardBody>
				{<div className="rules" >
					<ol>
						<li>$10 entry fee for the entire season.</li>
						<li>Pick 7 characters you think will perish in season 7.</li> 
						<li>Rank your picks on how confident you are each will die.</li>
						<ul>
							<li>For example: If you’re 100% positive that Cersei Lannister will die this season, you would pick her and assign 7 points (the maximum amount) to her.</li>
							<li>After Cersei dies you think Arya Stark will die, you might choose Arya and assign 6 points to her character.</li>
							<li>Continue this until all your 7 characters are chosen and all have been assigned a point value.</li>							</ul>
						<li>If you choose correctly and that character dies by the end of season 7, you are awarded the points you assigned to the character.</li>
						<li>The players ranked 1st and 2nd at the end of the season will take the 1st and 2nd place winnings.</li>
						<li>In the event of a tie, the win goes to the closest player (without going over) to guess the time into the season finale for the last kill of the season. </li>
						<ul>
							<li>For example: If the last episode is 77 minutes long, I might guess the last kill will take place at the 67:30 mark.</li>
						</ul>
						<li>Picks will be locked at the beginning of episode 2.</li>
					</ol>
				</div>}
			</ModalCardBody>
		</ModalCard>
	</Modal>
);

RulesModal.propTypes = {
	toggleRules: PropTypes.func.isRequired
};

export default RulesModal;
