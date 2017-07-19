'use strict';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Formik } from 'formik';
import Yup, { addMethod, string, ref } from 'yup';
import { Button, Control, Field, Help, Input, Label } from 'bloomer';

import { displayError, getFormControlOutlineColor } from '../globals';
import { writeLog } from '../collections/gotlogs';

const SimpleForm = ({
	values,
	touched,
	errors,
	error,
	goLogin,
	handleChange,
	handleSubmit,
	handleBlur,
	handleReset,
	isSubmitting
}) =>
	<form onSubmit={handleSubmit}>
		<Field>
			<Label>Email</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.email, isTouched: touched.email })}
					type="text"
					name="email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Email Address" />
			</Control>
			{errors.email && touched.email && <Help isColor="danger">{errors.email}</Help>}
		</Field>

		<Field>
			<Label>Password</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.password, isTouched: touched.password })}
					type="password"
					name="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Password" />
			</Control>
			{errors.password && touched.password && <Help isColor="danger">{errors.password}</Help>}
		</Field>

		<Field>
			<Label>Confirm Password</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.confirmPassword, isTouched: touched.confirmPassword })}
					type="password"
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Confirm Password" />
			</Control>
			{errors.confirmPassword && touched.confirmPassword && <Help isColor="danger">{errors.confirmPassword}</Help>}
		</Field>

		<Field>
			<Label>First Name</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.first_name, isTouched: touched.last_name })}
					type="text"
					name="first_name"
					value={values.first_name}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="First Name" />
			</Control>
			{errors.first_name && touched.first_name && <Help isColor="danger">{errors.first_name}</Help>}
		</Field>

		<Field>
			<Label>Last Name</Label>
			<Control>
				<Input
					isColor={getFormControlOutlineColor({ hasError: errors.last_name, isTouched: touched.last_name })}
					type="text"
					name="last_name"
					value={values.last_name}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Last Name" />
			</Control>
			{errors.last_name && touched.last_name && <Help isColor="danger">{errors.last_name}</Help>}
		</Field>

		<Field isGrouped>
			<Control>
				<Button type="submit" isLoading={isSubmitting} isColor="primary">Register</Button>
			</Control>
			<Control>
				<Button type="button" isColor="info" onClick={goLogin}>Login</Button>
			</Control>
		</Field>

		{error && error.message && <Help isColor="danger">{error.message}</Help>}
	</form>;

SimpleForm.propTypes = {
	error: PropTypes.object,
	errors: PropTypes.object.isRequired,
	isSubmitting: PropTypes.bool.isRequired,
	touched: PropTypes.object.isRequired,
	values: PropTypes.object.isRequired,
	goLogin: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

addMethod(string, 'sameAs', function (ref, message) {
	return this.test('sameAs', message, function (value) {
		let other = this.resolve(ref);
		return !other || !value || value === other;
	});
});

export default Formik({
	validationSchema: Yup.object().shape({
		email: Yup.string().email('Please enter a valid email').required('Email address is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please enter a password'),
		confirmPassword: Yup.string().sameAs(ref('password'), 'Please enter the same password again').required('Please enter the same password again'),
		first_name: Yup.string().required('Please enter your first name'),
		last_name: Yup.string().required('Please enter your last name')
	}),

	mapPropsToValues: props => ({
		email: '',
		password: '',
		confirmPassword: '',
		first_name: '',
		last_name: ''
	}),

	mapValuesToPayload: values => ({
		email: values.email,
		password: values.password,
		profile: {
			first_name: values.first_name,
			last_name: values.last_name
		}
	}),

	handleSubmit: (payload, { props, setError, setSubmitting }) => {
		Accounts.createUser(payload, (err) => {
			if (err && err.reason !== 'Login forbidden') {
				setError(err);
				setSubmitting(false);
				if (err.error && err.reason) {
					displayError(err, { title: err.error, message: err.reason, type: 'warning' });
				} else {
					displayError(err);
				}
			} else {
				Bert.alert({
					message: 'Thanks for registering',
					type: 'success'
				});
				writeLog.call({ userId: Meteor.userId(), action: 'REGISTER' }, displayError);
			}
		});
	},
})(SimpleForm);
