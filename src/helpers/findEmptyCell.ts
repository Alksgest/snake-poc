import {gridPadding, gridTopOffset} from "../settings.ts";

export function findEmptyCell(gridWidth: number, gridHeight: number, cellWidth: number, cellHeight: number, snakePositions: Phaser.Math.Vector2[], alreadySpawnedPositions: Phaser.Math.Vector2[]): Phaser.Math.Vector2 | null {
    let emptyCellFound = false;
    let spawnPosition: Phaser.Math.Vector2 | null = null;

    while (!emptyCellFound) {
        // Generate random x and y indices
        const randomX = Math.floor(Math.random() * (gridWidth - 2));
        const randomY = Math.floor(Math.random() * gridHeight);

        const x = Math.ceil(randomX * cellWidth + cellWidth * 2) + gridPadding;
        const y = Math.ceil(randomY * cellHeight) + gridTopOffset - 2; // TODO: "-2" under discussion

        // Create a vector for the spawn position
        spawnPosition = new Phaser.Math.Vector2(x, y);
        // Check if the position is occupied by the snake
        const isOccupied = [...snakePositions, ...alreadySpawnedPositions].some((position) => position.equals(spawnPosition!));

        // If the position is not occupied, we have found an empty cell
        if (!isOccupied) {
            emptyCellFound = true;
        }
    }

    return spawnPosition;
}