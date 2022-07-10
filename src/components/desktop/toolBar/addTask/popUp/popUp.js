import React from 'react';
import styles from './styles.module.css';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../../../redux/tasksSlice';
import firebase from '../../../../../firebase/Firebase'
import { v4 } from 'uuid';
import ColorInput from './colorInput/ColorInput';
import { useSelector } from 'react-redux';
import { setLatestTask } from '../../../../../redux/latestTaskSlice';

export default function PopUp(props) {
	let dispatch = useDispatch();
	let currentDay = useSelector(state => state.currentDay.day);

	let year = new Date().getFullYear();
	let month = new Date().getMonth()+1;
	let day = new Date().getDate();
	let todayDate = day + "." + month + "." + year;
	if (currentDay) {
		todayDate = currentDay;
	}

	const validate = (values) => {
		const errors = {};
		if (!values.name || values.name === "") {
			errors.name = 'Task name is required';
		} else if (values.name.length > 20) {
			errors.name = 'Must be 20 characters or less';
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
					startHour: '',
					startMinute: '',
					date: todayDate,
					id: null,
					left: 0
				}}
				validate={validate}
				onSubmit={(values) => {
					if (values.startHour === '') {
						values.startHour = 0;
					}
					if (values.startMinute === '') {
						values.startMinute = 0;
					}
					values.id = v4();
					dispatch(addTask(values));
					dispatch(setLatestTask(values))
					firebase.update();
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
							{errors.name ? <div className={styles.error}>{errors.name}</div> : null}
						</div>
						<div className={styles.formElement}>
							<label>Color: </label>
							<ColorInput
								id='color'
								name='color'
								onChange={handleChange}
								value={values.color}
							></ColorInput>
						</div>
						<div className={styles.formElement}>
							<label>Start time: </label>
							<label>Hour:</label>
							<input
								id='startHour'
								name='startHour'
								type='text'
								onChange={handleChange}
								onBlur={(e) => {
									handleBlur(e);
									let value = parseInt(e.target.value);
									if (value > 23) value = 23;
									setFieldValue('startHour', value);
								}}
								value={values.startHour}
								placeholder="0"
							></input>
							<label>Minute:</label>
							<input
								id='startMinute'
								name='startMinute'
								type='text'
								onChange={handleChange}
								onBlur={(e) => {
									handleBlur(e);
									let value = parseInt(e.target.value);
									if (value % 5 !== 0) {
										value = value + (5 - (value % 5));
									}
									if (value > 55) value = 55;
									setFieldValue('startMinute', value);
								}}
								value={values.startMinute}
								placeholder="0"
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
				}}>
				X
			</button>
		</div>
	);
}
