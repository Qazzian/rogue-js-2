export interface DebugFlags {
	showRoomNumbers: boolean;
	showFovGeometry: boolean;
	showFov: boolean;
}

export interface DebugOption {
	name: keyof DebugFlags;
	value: boolean;
}
