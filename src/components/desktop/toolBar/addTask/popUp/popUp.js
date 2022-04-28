import { React, useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Formik } from 'formik';
import Tile from '../../../day/tile/Tile';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../../../redux/tasksSlice';

export default function PopUp(props) {
	const [toggleTime, setToggleTime] = useState('minutes');

	let dispatch = useDispatch();

	const validate = (values) => {
		const errors = {};
		if (!values.name) {
			errors.name = 'Required';
		} else if (values.name.length > 20) {
			errors.name = 'Must be 20 characters or less';
		}

		if (!values.duration) {
			errors.duration = 'Required';
		} else if (values.duration > 1440) {
			errors.duration = 'Must be 1440 characters or less';
		}

		return errors;
	};

	return (
		<div className={styles.popUp}>
			<Formik
				initialValues={{
					name: '',
					duration: 0,
					color: '',
					startHour: 0,
					startMinute: 0,
				}}
				validateForm={{ validate }}
        onSubmit={(values) => {
					dispatch(addTask(values))
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					setFieldValue,
				}) => (
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.formElement}>
							<label htmlFor='text'>Name:</label>
							<input
								id='name'
								name='name'
								type='text'
								onChange={handleChange}
								value={values.name}
							/>
							{errors.name ? <div>{errors.name}</div> : null}
						</div>
						<div className={styles.formElement}>
							<label>Duration in minutes: </label>
							<input
								id='duration'
								name='duration'
								type='number'
								onChange={handleChange}
								onBlur={(e) => {
									handleBlur(e);
									let value = parseInt(e.target.value);
									if (value % 5 != 0) {
										value = value + (5 - (value % 5));
									}
									setFieldValue('duration', value);
								}}
								value={values.duration}
							></input>
						</div>
						<div className={styles.formElement}>
							<label>Color: </label>
							<input
								id='color'
								name='color'
								type='text'
								onChange={handleChange}
								value={values.color}
							></input>
						</div>
						<div className={styles.formElement}>
							<label>Start time: </label>
							<label>Hour:</label>
							<input
								id='startHour'
								name='startHour'
								type='number'
								onChange={handleChange}
								onBlur={(e) => {
									handleBlur(e);
									let value = parseInt(e.target.value);
									if (value % 5 != 0) {
										value = value + (5 - (value % 5));
									}
									if (value > 23) value = 23;
									setFieldValue('startHour', value);
								}}
								value={values.startHour}
							></input>
							<label>Minute:</label>
							<input
								id='startMinute'
								name='startMinute'
								type='number'
								onChange={handleChange}
								onBlur={(e) => {
									handleBlur(e);
									let value = parseInt(e.target.value);
									if (value % 5 != 0) {
										value = value + (5 - (value % 5));
									}
									if (value > 55) value = 55;
									setFieldValue('startMinute', value);
								}}
								value={values.startMinute}
							></input>
						</div>
						<button className={styles.submitButton} type='submit'>
							Submit
						</button>
					</form>
				)}
			</Formik>
			<button
				className={styles.closeButton}
        onClick={() => {
          props.toggle();
				}}
			>
				X
			</button>
		</div>
	);
}
