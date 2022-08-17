//TODO:delete ve add butonlarina fonksiyon ekle
import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
const api_base_url = 'http://localhost:4555';

export const AppContext = createContext();

const initialState = {
	count: 0,
	germanNouns: [],
	editingCard: {
		id: null,
		original: { singular: null, plural: null, article: null },

		formValues: { singular: null, plural: null, article: null },
	},
};

function reducer(state, action) {
	let _state = { ...state };
	let item, property, id, value, selectedItem;
	switch (action.type) {
		case 'increaseCount':
			_state.count++;
			break;
		case 'decreaseCount':
			_state.count--;
			break;
		case 'loadGermanNouns':
			_state.germanNouns = action.payload;
			break;

		case 'changeItemProperty':
			property = action.payload.property;
			id = action.payload.id;
			value = action.payload.value;

			break;
		case 'updateModeAsEditing':
			item = action.payload.item;

			_state.editingCard.id = item.id;
			_state.editingCard.original.singular = item.singular;
			_state.editingCard.original.article = item.article;
			_state.editingCard.original.plural = item.plural;

			selectedItem = _state.germanNouns.find((m) => {
				return m.id === item.id;
			});

			selectedItem.isEditing = true;
			selectedItem.manageMessage = 'Edit this item.';
			break;
		case 'saveItemChanges':
			id = action.payload.id;

			selectedItem = _state.germanNouns.find((m) => {
				return m.id === id;
			});
			selectedItem.singular = _state.editingCard.formValues.singular;
			selectedItem.article = _state.editingCard.formValues.article;
			selectedItem.plural = _state.editingCard.formValues.plural;
			selectedItem.isEditing = false;
			// _state.originalValuesBeforeEditing.id = undefined;
			// _state.originalValuesBeforeEditing.singular = undefined;
			// _state.originalValuesBeforeEditing.article = undefined;
			// _state.originalValuesBeforeEditing.plural = undefined;
			break;
		case 'changeFormValuesWithoutSaving':
			const valueType = action.payload.valueType;
			const formValue = action.payload.formValue;

			_state.editingCard.formValues[valueType] = formValue;

			break;
		case 'clearItemEditing':
			id = action.payload.id;
			item = state.germanNouns.find((m) => {
				return m.id === id;
			});
			item.isEditing = false;

			item.manageMessage = 'Manage options:';
			break;
		case 'updateItemReadyToDeleting':
			id = action.payload.id;
			item = state.germanNouns.find((m) => {
				return m.id === id;
			});

			item.isReadyToDelete = true;
			item.manageMessage = 'Are you sure you want to delete this item?';
			break;
		case 'clearItemDeleting':
			id = action.payload.id;
			item = state.germanNouns.find((m) => {
				return m.id === id;
			});
			item.isReadyToDelete = false;

			item.manageMessage = 'Manage options:';
			break;

		case 'saveItemDeleting':
			id = action.payload.id;

			saveItem = { article, singular, plural } = item; //TODO: what das it mean 2 equals?
			item.isEditing = 'reading';
			item.manageMessage = 'Manage options:';
			break;
		case 'deleteItem':
			id = action.payload.id;
			item = state.germanNouns.find((m) => {
				return m.id === id;
			});
			const itemIndex = _state.germanNouns.indexOf(item);
			if (itemIndex > -1) {
				_state.germanNouns.splice(itemIndex, 1);
			}
			break;
		case 'saveNewItem':
			const newSingular = action.payload.singular;
			const newPlural = action.payload.plural;
			const newArticle = action.payload.article;
			const newId =
				_state.germanNouns[_state.germanNouns.length - 1].id + 1;
			_state.germanNouns.push({
				id: newId,
				article: newArticle,
				singular: newSingular,
				plural: newPlural,
				isEditing: false,
				isReadyToDelete: false,
			});
			break;
	}
	return _state;
}

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		(async () => {
			const _germanNouns = (
				await axios.get(`${api_base_url}/germanNouns`)
			).data;

			_germanNouns.forEach((m) => {
				m.isEditing = 'false';

				m.manageMessage = 'Manage Options:';
				m.isReadyToDelete = false;
			});
			dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
		})();
	}, []);
	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
