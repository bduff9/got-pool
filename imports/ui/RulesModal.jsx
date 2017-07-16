'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, ModalBackground, ModalClose, ModalContent } from 'bloomer';

const RulesModal = ({ toggleRules }) => (
	<Modal isActive>
		<ModalBackground onClick={toggleRules} />
		<ModalContent>
			<Box>TODO: Rules</Box>
		</ModalContent>
		<ModalClose onClick={toggleRules} />
	</Modal>
);

RulesModal.propTypes = {
	toggleRules: PropTypes.func.isRequired
};

export default RulesModal;
