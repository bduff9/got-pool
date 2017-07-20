'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Delete, Modal, ModalBackground, ModalCard, ModalCardHeader, ModalCardBody, ModalCardTitle } from 'bloomer';

const RulesModal = ({ toggleRules }) => (
	<Modal isActive>
		<ModalBackground onClick={toggleRules} />
		<ModalCard>	
			<ModalCardHeader>
				<ModalCardTitle style={{ fontFamily: 'got' }}>Rules</ModalCardTitle>
				<Delete onClick={toggleRules} />
			</ModalCardHeader>
			<ModalCardBody>
				{<div className="rules" >
					<h4><strong>Note: Picks will be locked at the beginning of episode 2.</strong></h4>
					<ol>
						<li>$10 entry fee for the entire season.</li>
						<li>Pick 7 characters you think will perish in season 7.</li> 
						<li>Rank your picks on how confident you are each will die.</li>
						<ul>
							<li>For example: If you’re 100% positive that Cersei Lannister will die this season, you would pick her and assign 7 points (the maximum amount) to her.</li>
							<li>After Cersei dies you think Arya Stark will die, you might choose Arya and assign 6 points to her character.</li>
							<li>Continue this until all your 7 characters are chosen and all have been assigned a point value.</li>							</ul>
						<li>If you choose correctly and that character dies by the end of season 7, you are awarded the points you assigned to the character.</li>
						<li>A character is considered dead if they are still dead by the curtain closing of season 7.</li>
						<li>A character turning into a member of the army of the dead is still considered dead.</li>
						<li>The players ranked 1st and 2nd at the end of the season will take the 1st and 2nd place winnings.</li>
						<li>In the event of a tie, the play who picks closest to the total number of available characters (without going over) to die will win.</li>
						<li>In the event of a tie for end of season points AND a tie for the tiebreaker, the players involved will split the pot.</li>
						
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
