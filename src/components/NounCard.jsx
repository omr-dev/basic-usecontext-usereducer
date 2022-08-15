
import { CardValue } from './CardValue';
import { CardManageButtons } from './CardManageButtons';

export const NounCard = ({ item }) => {

	const noun = item;
	const article = noun.article;
	const singular = noun.singular;
	const plural = noun.plural;
	const isEditingCard = noun.isEditing;

	return (
		<fieldset className="nounBox">
			<legend>ID: {noun.id}</legend>
			<div className="row">
				<label htmlFor="article">Article</label>
				<CardValue
					className="cardValue"
					isEditingCard={isEditingCard}
					value={article}
				/>
			</div>
			<div className="row">
				<label htmlFor="singular">Singular</label>
				<CardValue isEditingCard={isEditingCard} value={singular} />
			</div>
			<div className="row">
				<label htmlFor="plural">Plural</label>
				<CardValue
					className="cardValue"
					isEditingCard={isEditingCard}
					value={plural}
				/>
			</div>
			<CardManageButtons isEditingCard={isEditingCard} item={item} />
		</fieldset>
	);
};
