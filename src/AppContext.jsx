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
	messageToUser: '',
};

function reducer(state, action) {
	let _state = { ...state };
	let item, id, selectedItem;
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
		case 'saveItemChanges':
			console.log(107, 'context dispatch edildi', action.payload);

			const newSingular = action.payload.item.singular;
			const newPlural = action.payload.item.plural;
			const newArticle = action.payload.item.article;
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
		case 'handleFailedSave':
			item = action.payload.item;
			_state.message = action.payload.message;

			item.isProcessing = false;
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

	const apiDispatch = async (action) => {
		const item = action.payload?.item;
		const newId = state.germanNouns[state.germanNouns.length - 1].id + 1;
		let itemForApi = {};
		if (item) {
			itemForApi = {
				id: newId,
				article: item.article,
				singular: item.singular,
				plural: item.plural,
			};
		}
		switch (action.type) {
			case 'saveItem': {
				// dispatch({
				// 	type: 'turnOnProcessingStatus',
				// 	payload: { item },
				//  }) ;
				try {
					const responseOfApi = await axios.post(
						`${api_base_url}/germanNouns/`,
						itemForApi
					);
					if ([200, 201].includes(responseOfApi.status)) {
						dispatch(action);
						console.log(175, 'action dispatch edildi');
					} else {
						dispatch({
							type: 'handleFailedSave',
							payload: {
								item,
								message: `API Error: ${response.status}`,
							},
						});
					}
				} catch (err) {
					dispatch({
						type: 'handleFailedSave',
						payload: {
							item,
							message: `Error: ${err.message}`,
						},
					});
				}
				break;
			}
			case 'saveItemChanges': {
				itemForApi = {
					id: state.editingCard.id,
					article: state.editingCard.formValues.article,
					singular: state.editingCard.formValues.singular,
					plural: state.editingCard.formValues.plural,
				};
				// dispatch({
				// 	type: 'turnOnProcessingStatus',
				// 	payload: { item },
				//  }) ;
				try {
					console.log(204, 'id', itemForApi);
					const responseOfApi = await axios.put(
						`${api_base_url}/germanNouns/${itemForApi.id}`,
						itemForApi
					);
					if ([200, 201].includes(responseOfApi.status)) {
						dispatch(action);
						console.log(175, 'action dispatch edildi');
					} else {
						dispatch({
							type: 'handleFailedSave',
							payload: {
								item,
								message: `API Error: ${response.status}`,
							},
						});
					}
				} catch (err) {
					dispatch({
						type: 'handleFailedSave',
						payload: {
							item,
							message: `Error: ${err.message}`,
						},
					});
				}
				break;
			}
		}
	};
	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
				apiDispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
