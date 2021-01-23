import './App.css';
import React from 'react';
import Header from "./components/Header/Header.js";
import Branches from "./components/Branches/Branches.js";
function App() {
	return (
		<React.Fragment>
			<Header />
			<Branches/>
		</React.Fragment>
	);
}

export default App;
