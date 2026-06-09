import React from "react";

import "./controles.css";

export interface ControllerProps {
	onKeyPress: (key: string) => void;
}


export default function Controles(props: ControllerProps) {

	const onPress = props.onKeyPress;

 return (
	 <section class-name="Controller">
		<p>Controlles</p>
		<button onPointerUp={()=>onPress("ArrowUp")}>up</button>
		<button onPointerUp={()=>onPress("ArrowLeft")}>left</button>
		<button onPointerUp={()=>onPress("ArrowDown")}>down</button>
		<button onPointerUp={()=>onPress("ArrowRight")}>right</button>
	 </section>
 )
}
