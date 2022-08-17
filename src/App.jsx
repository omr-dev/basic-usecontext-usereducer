import { useContext, useState } from 'react';
import './App.scss';
import { AppContext } from './AppContext';
import { NewNounBox } from './components/NewNounBox';
import { NounCard } from './components/NounCard';

function App() {
	const { state, dispatch } = useContext(AppContext);

	return (
		<div className="App">
			<h1>useContext/useReducer basic app</h1>
			<h2>Count</h2>
			<div className="CountBox">
				<button onClick={() => dispatch('decreaseCount')}>-</button>
				<button onClick={() => dispatch('increaseCount')}>+</button>
				<p>{state.count}</p>
			</div>
			<NewNounBox />
			<div className="germanNounArea">
				{state.germanNouns.map((item, i) => {
					return <NounCard key={i} item={item} />;
				})}
			</div>
		</div>
	);
}

export default App;
