import { useState, useRef, useEffect } from 'react';
export const CardValue = ({ isEditingCard, value }) => {
	const originalValue = value;
	let [formValue, setFormValue] = useState(originalValue);
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			console.log('first render');
			return;
		}

		if (!isEditingCard) {
			setFormValue(originalValue);
		}
	}, [isEditingCard]);

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
