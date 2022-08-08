import { useState } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
	const [count, setCount] = useState(0);
	return (
		<AppContext.Provider
			value={{
				count,
				setCount,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
