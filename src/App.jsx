import { useContext } from 'react';
import './App.scss';
import { AppContext } from './AppContext';

function App() {
	const { state, dispatch } = useContext(AppContext);
	// function changeCounter(changeType) {
	// 	if (changeType === '-') {
	// 		setCount(count - 1);
	// 	} else if (changeType === '+') {
	// 		setCount(count + 1);
	// 	}
	// }
	return (
		<div className="App">
			<h1>useContext/useReducer basic app</h1>
			<h2>Count</h2>
			<div className="CountBox">
				<button onClick={() => dispatch('decreaseCount')}>-</button>
				<button onClick={() => dispatch('increaseCount')}>+</button>
				<p>{state.count}</p>
			</div>
		</div>
	);
}

export default App;
