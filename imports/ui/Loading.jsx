'use strict';

import React from 'react';
import PropTypes from 'prop-types';import Helmet from 'react-helmet';

const Loading = ({ children, isLoading }) => {
	return (
		<div className="col">
			{isLoading ? (
				<div className="white-box col-xs-10 col-sm-10 col-md-6 col-xl-4">
					<Helmet title="Loading..." />
					<div className="row">
						<div className="text-xs-center col-xs-12">
							<h3>Loading&nbsp;&nbsp; <i className="fa fa-spinner fa-pulse" /></h3>
						</div>
					</div>
				</div>
			)
				:
				children
			}
		</div>
	);
};

Loading.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	isLoading: PropTypes.bool.isRequired
};

export default Loading;
