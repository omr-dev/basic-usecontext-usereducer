import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const CardManageButtons = ({ item, isEditingCard, isReadyToDelete }) => {
	const { state, dispatch, apiDispatch } = useContext(AppContext);

	return (
		<div className="buttonRow">
			<div className="manageMessage">{item.manageMessage}</div>

			<div className="buttonArea">
				{isEditingCard === true ? (
					<>
						<button
							onClick={() => {
								apiDispatch({
									type: 'saveItemChanges',
									payload: { id: item.id },
								});
								dispatch({
									type: 'clearItemEditing',
									payload: { id: item.id },
								});
							}}
						>
							Save
						</button>
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
						{isReadyToDelete === true ? (
							<>
								<button
									onClick={() => {
										dispatch({
											type: 'deleteItem',
											payload: { id: item.id },
										});
									}}
								>
									Yes
								</button>
								<button
									onClick={() => {
										dispatch({
											type: 'clearItemDeleting',
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
										if (state.editingCard.id !== null) {
											dispatch({
												type: 'clearItemEditing',
												payload: {
													id: state.editingCard.id,
												},
											});
										}
										dispatch({
											type: 'updateModeAsEditing',
											payload: { item },
										});
									}}
								>
									Edit
								</button>
								<button
									onClick={() => {
										dispatch({
											type: 'updateItemReadyToDeleting',
											payload: { id: item.id },
										});
									}}
								>
									Delete
								</button>
								{/* <button onClick={() => {}}>Add</button> */}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
};
