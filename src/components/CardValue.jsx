import { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
export const CardValue = ({ valueType, item }) => {
	const { state, dispatch } = useContext(AppContext);
	const isEditingCard = item.isEditing;

	const originalValue = item[valueType];
	let [formValue, setFormValue] = useState();
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;

			return;
		}

		if (isEditingCard) {
			setFormValue(originalValue);
		}
	}, [isEditingCard]);
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;

			return;
		}

		dispatch({
			type: 'changeFormValuesWithoutSaving',
			payload: { valueType, formValue },
		});
	}, [formValue]);

	return (
		<div className="cardValue">
			{isEditingCard === true ? (
				<input
					value={formValue}
					onChange={(e) => {
						setFormValue(e.target.value);
					}}
				/>
			) : (
				originalValue
			)}
		</div>
	);
};
