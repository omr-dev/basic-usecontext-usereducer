import { useContext } from 'react';
import './App.scss';
import { AppContext } from './AppContext';

function App() {
	const {count, setCount} = useContext(AppContext);
	function changeCounter(changeType) {
		if (changeType === '-') {
			setCount(count - 1);
		} else if (changeType === '+') {
			setCount(count + 1);
		}
	}
	return (
		<div className="App">
			<h1>useContext/useReducer basic app</h1>
			<h2>Count</h2>
			<div className="CountBox">
				<button onClick={() => changeCounter('-')}>-</button>
				<button onClick={() => changeCounter('+')}>+</button>
				<p>{count}</p>
			</div>
		</div>
	);
}

export default App;
