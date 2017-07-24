'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import { Formik } from 'formik';
import Yup from 'yup';
import { Button, Control, Field, FieldBody, FieldLabel, Help, Icon, Input, Label } from 'bloomer';

import { displayError, getFormControlOutlineColor } from '../globals';
import { writeLog } from '../collections/gotlogs';

const SimpleForm = ({
	values,
	touched,
	errors,
	error,
	goRegister,
	handleChange,
	handleSubmit,
	handleBlur,
	handleReset,
	isSubmitting
}) =>
	<form onSubmit={handleSubmit}>
		<Field isHorizontal>
			<FieldLabel isNormal>
				<Label>Email</Label>
			</FieldLabel>
			<FieldBody>
				<Field isGrouped>
					<Control isExpanded hasIcons="left">
						<Input
							isColor={getFormControlOutlineColor({ hasError: errors.email, isTouched: touched.email })}
							type="text"
							name="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Email Address" />
						<Icon isSize="small" isAlign="left"><i className="fa fa-user" aria-hidden="true"/></Icon>
					</Control>
					{errors.email && touched.email && <Help isColor="danger">{errors.email}</Help>}
				</Field>
			</FieldBody>
			<FieldLabel isNormal>
				<Label>Password</Label>
			</FieldLabel>
			<FieldBody>
				<Field isGrouped>
					<Control isExpanded hasIcons="left">
						<Input
							isColor={getFormControlOutlineColor({ hasError: errors.password, isTouched: touched.password })}
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Password" />
						<Icon isSize="small" isAlign="left"><i className="fa fa-lock" aria-hidden="true"/></Icon>
					</Control>
					{errors.password && touched.password && <Help isColor="danger">{errors.password}</Help>}
				</Field>
			</FieldBody>
			<Field isGrouped>
				<FieldLabel />
				<Control>
					<Button type="submit" isLoading={isSubmitting} isColor="primary">Login</Button>
				</Control>
				{/* 2017-07-24: Commented out since registration has ended
				<Control>
					<Button type="button" isColor="info" onClick={goRegister}>Register</Button>
				</Control>*/}
			</Field>
			{error && error.message && <Help isColor="danger">{error.message}</Help>}
		</Field>
	</form>;

SimpleForm.propTypes = {
	error: PropTypes.object,
	errors: PropTypes.object.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	touched: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired,
	goRegister: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default Formik({
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Please enter a valid email').required('Email address is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter a password')
	}),

	mapPropsToValues: props => ({
		email: '',
		password: ''
	}),

	handleSubmit: (payload, { props, setError, setSubmitting }) => {
		const { email, password } = payload;
		Meteor.loginWithPassword(email, password, err => {
			if (err) {
				setError(err);
				setSubmitting(false);
				if (err.reason === 'User not found') {
					displayError(err, { title: 'User not found!  Did you mean to register using the button at the bottom right of this page instead?', type: 'warning' });
				} else {
					displayError(err, { title: err.reason, type: 'warning' });
				}
				writeLog.call({ userId: '', action: 'LOGIN', message: `${email} failed to sign in` }, displayError);
			} else {
				Bert.alert({
					message: 'Welcome back!',
					type: 'success',
					icon: 'fa-thumbs-up'
				});
				writeLog.call({ userId: Meteor.userId(), action: 'LOGIN' }, displayError);
			}
		});
	},
})(SimpleForm);
