import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const CardManageButtons = ({ item, isEditingCard }) => {
	const { state, dispatch } = useContext(AppContext);
	console.log(6, isEditingCard);
	return (
		<div className="buttonRow">
			<div className="manageMessage">{item.message}</div>
			<div className="buttonArea">
				{isEditingCard === true ? (
					<>
						<button>Save</button>
						<button
							onClick={() => {
								dispatch({
									type: 'clearItemEditing',
									payload: { id: item.id },
								});
							}}
						>
							Cancel
						</button>
					</>
				) : (
					<>
						<button
							onClick={() => {
								dispatch({
									type: 'updateModeAsEditing',
									payload: { id: item.id },
								});
							}}
						>
							Edit
						</button>
						<button onClick={() => {}}>Delete</button>
						<button onClick={() => {}}>Add</button>
					</>
				)}
			</div>
		</div>
	);
};
