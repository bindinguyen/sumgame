import { GameEngine } from "./core/gameengine.js"
import { AssetManager } from "./core/assetmanager.js"

const gameEngine = new GameEngine();
window.gameEngine = gameEngine;

const ASSET_MANAGER = new AssetManager();
window.assetManager = ASSET_MANAGER;

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		if (gameEngine.map) {
			gameEngine.map.resize();
		}
	}

	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	gameEngine.init(ctx);

	gameEngine.start();
});
