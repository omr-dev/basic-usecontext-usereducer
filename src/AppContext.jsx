import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
const api_base_url = 'http://localhost:4555';

export const AppContext = createContext();

const initialState = {
	count: 0,
	germanNouns: [],
	
};

function reducer(state, action) {
	let _state = { ...state };
	let item, property, id, value;
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
			console.log('updatemodeasediting cagirildi');
			id = action.payload.id;

			const selectedItem = _state.germanNouns.find((m) => {
				return m.id === id;
			});

			selectedItem.isEditing = true; 
			selectedItem.manageMessage = 'Edit this item.';
			break;
		case 'clearItemEditing':
			id = action.payload.id;
			item = state.germanNouns.find((m) => {
				return m.id === id;
			});
			item.isEditing = false;
			
			item.manageMessage = 'Manage options:';
			break;
		case 'toggleItemDeleting':
			itemType = action.payload.itemType;
			id = action.payload.id;
			
			item.isDeleting = !item.isDeleting;
			item.manageMessage = 'Are you sure you want to delete this item?';
			break;
		case 'clearItemDeleting':
			id = action.payload.id;
			
			item.isDeleting = false;
			item.manageMessage = 'Manage options:';
			break;
		case 'saveItemDeleting':
			id = action.payload.id;
			
			saveItem = { article, singular, plural } = item; //TODO: what das it mean 2 equals?
			item.isEditing = 'reading';
			item.manageMessage = 'Manage options:';
			break;
		case 'deleteItem':
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
