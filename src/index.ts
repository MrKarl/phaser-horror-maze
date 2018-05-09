// import * as g from './maze'
import { Game } from './maze';

window.onload = () => {
    const width = 640;
    const height = 600; // 120 * 420
    const parentId = 'game';

    // Should be initialize game object and run
    const maze = new Game.Maze(width, height, parentId);
};