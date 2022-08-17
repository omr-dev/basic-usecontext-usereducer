import { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

export const NewNounFormBox = ({ setIsReadyForNewItem }) => {
	const [formValueSingular, setFormValueSingular] = useState('');
	const [formValuePlural, setFormValuePlural] = useState('');
	const [formValueArticle, setFormValueArticle] = useState('');
	const { state, dispatch } = useContext(AppContext);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				dispatch({
					type: 'saveNewItem',
					payload: {
						article: formValueArticle,
						plural: formValuePlural,
						singular: formValueSingular,
					},
				});
				setIsReadyForNewItem(false);
			}}
		>
			<fieldset className="nounBox">
				<legend>NEW NOUN</legend>
				<div className="row">
					<label htmlFor="article">Article</label>
					<input
						value={formValueArticle}
						onChange={(e) => {
							setFormValueArticle(e.target.value);
						}}
						requiered="true"
					/>
				</div>
				<div className="row">
					<label htmlFor="singular">Singular</label>
					<input
						value={formValueSingular}
						onChange={(e) => {
							setFormValueSingular(e.target.value);
						}}
						requiered="true"
					/>
				</div>
				<div className="row">
					<label htmlFor="plural">Plural</label>
					<input
						value={formValuePlural}
						onChange={(e) => {
							setFormValuePlural(e.target.value);
						}}
						requiered="true"
					/>
				</div>
				<div className="buttonRow" style={{ justifyContent: 'end' }}>
					<button type="Submit">Add</button>
					<button
						onClick={() => {
							setIsReadyForNewItem(false);
						}}
					>
						Cancel
					</button>
				</div>
			</fieldset>
		</form>
	);
};
