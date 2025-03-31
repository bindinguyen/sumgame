import { GameEngine } from "./core/gameengine.js"
import { AssetManager } from "./core/assetmanager.js"

const gameEngine = new GameEngine();
window.gameEngine = gameEngine;

const ASSET_MANAGER = new AssetManager();
window.assetManager = ASSET_MANAGER;

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.start();
});
