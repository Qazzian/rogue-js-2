import React from 'react';
import ReactDOM from "react-dom";
import GameComponents from './GameComponents';

import './index.css';




ReactDOM.render(React.createElement(GameComponents), document.getElementById('App'));


function debugOptionChanged(event:Event) {
	const target = event.currentTarget as HTMLInputElement;
	const flagName =  target.id;
	const value = target.checked;
}
