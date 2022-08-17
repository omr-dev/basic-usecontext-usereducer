import { useState } from 'react';
import { NewNounFormBox } from './NewNounFormBox';
export const NewNounBox = () => {
	const [isReadyForNewItem, setIsReadyForNewItem] = useState(false);
	return (
		<div className="newNounBox">
			{isReadyForNewItem === false ? (
				<button
					onClick={() => {
						setIsReadyForNewItem(true);
					}}
				>
					Add
				</button>
			) : (
				<NewNounFormBox setIsReadyForNewItem={setIsReadyForNewItem} />
			)}
		</div>
	);
};
