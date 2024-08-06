import { Scene } from "phaser";
import { Snake } from "../objects/Snake";
import {
  cellHeight,
  cellWidth,
  gridHeight,
  gridPadding,
  gridTopOffset,
  gridWidth,
  lineColor,
  tickDuration,
} from "../settings";
import { findEmptyCell, getPositions } from "../helpers"; // TODO: refactor code
import Tile = Phaser.Tilemaps.Tile;

// TODO: refactor code

export class Game extends Scene {
  background: Phaser.GameObjects.Image;
  grid: Phaser.GameObjects.Image;
  button: Phaser.GameObjects.Image;
  private snake: Snake;
  private elements: Phaser.Physics.Arcade.Group;
  private ticksCount = 0;
  private scoreLabel: Phaser.GameObjects.Text;

  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("button", "assets/button.png");
  }

  create() {
    this.snake = new Snake(
      this,
      cellWidth * 5 + gridPadding,
      cellHeight * 2 + gridTopOffset,
      cellWidth,
      cellHeight,
    );

    this.snake.snakeObserver.on("isAlive", (isAlive: boolean) =>
      console.log(isAlive),
    );

    if (this.input.keyboard) {
      this.input.keyboard.on("keydown", this.handleInput, this);
    }

    this.registry.set("score", 0);

    this.elements = this.physics.add.group();

    this.createUI();
    this.createControls();
    this.createCustomGrid();
    this.addTextInMergedCells();

    this.physics.add.collider(
      this.snake.getHead(),
      this.elements,
      this.handleFoodCollision,
      undefined,
      this,
    );

    // Game loop
    this.time.addEvent({
      delay: tickDuration,
      callback: this.updateGame,
      callbackScope: this,
      loop: true,
    });
  }

  handleInput(event: { key: string }) {
    switch (event.key) {
      case "ArrowUp":
        this.snake.setDirection(new Phaser.Math.Vector2(0, -1));
        break;
      case "ArrowDown":
        this.snake.setDirection(new Phaser.Math.Vector2(0, 1));
        break;
      case "ArrowLeft":
        this.snake.setDirection(new Phaser.Math.Vector2(-1, 0));
        break;
      case "ArrowRight":
        this.snake.setDirection(new Phaser.Math.Vector2(1, 0));
        break;
      case " ":
        this.snake.setDirection(new Phaser.Math.Vector2(0, 0));
        break;
      case "f":
        this.snake.toggleAlive();
        break;
      case "r":
        this.scene.restart();
        break;
    }
  }

  createUI() {
    // Score UI
    this.add.text(20, 20, "0", { font: "32px Arial", color: "#ffff00" });
    this.add.text(60, 20, "Рекорд", { font: "16px Arial", color: "#ffffff" });
    this.add.text(60, 40, "0", { font: "16px Arial", color: "#ffffff" });
    this.add.text(160, 20, "Всього балів", {
      font: "16px Arial",
      color: "#ffffff",
    });
    this.scoreLabel = this.add.text(160, 40, "0", {
      font: "16px Arial",
      color: "#ffffff",
    });
  }

  createControls() {
    const buttonSize = 60;
    const centerX = this.cameras.main.width / 2;
    const baseY = this.cameras.main.height - 100;

    this.add
      .sprite(centerX, baseY - buttonSize, "arrow")
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => this.handleInput({ key: "ArrowUp" }));

    const bottom = this.add
      .sprite(centerX, baseY + buttonSize, "arrow")
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => this.handleInput({ key: "ArrowDown" }));
    bottom.rotation = Math.PI;

    const left = this.add
      .sprite(centerX - buttonSize, baseY, "arrow")
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => this.handleInput({ key: "ArrowLeft" }));
    left.rotation = (Math.PI / 2) * -1;

    const right = this.add
      .sprite(centerX + buttonSize, baseY, "arrow")
      .setScale(0.5)
      .setInteractive()
      .on("pointerdown", () => this.handleInput({ key: "ArrowRight" }));
    right.rotation = Math.PI / 2;
  }

  addTextInMergedCells() {
    for (let i = 0; i < gridHeight; ++i) {
      const left = i < 10 ? `0${i}` : i;
      let right = i + 1 < 10 ? `0${i + 1}` : i + 1;
      right = right === 24 ? "00" : right;
      const text = this.add.text(
        gridPadding,
        gridTopOffset + cellHeight * i,
        `${left} - ${right}`,
        {
          font: "14px YasnoRaleway",
          color: "#495A7A",
          // backgroundColor: '#333333',
          padding: { x: 4, y: 2 },
        },
      );
      text.setOrigin(0);
    }
  }

  createCustomGrid() {
    const graphics = this.add.graphics();

    graphics.lineStyle(1, lineColor, 0.3);

    // Draw vertical lines
    for (let x = 0; x <= gridWidth; x++) {
      if (x === 1) {
        continue;
      }

      const xPos = x * cellWidth;
      graphics.moveTo(xPos + gridPadding, gridTopOffset);
      graphics.lineTo(
        xPos + gridPadding,
        gridHeight * cellHeight + gridTopOffset,
      );
    }

    // Draw horizontal lines
    for (let y = 0; y <= gridHeight; y++) {
      const yPos = y * cellHeight + gridTopOffset;
      graphics.moveTo(gridPadding, yPos);
      graphics.lineTo(gridWidth * cellWidth + gridPadding, yPos);
    }

    graphics.strokePath();
  }

  updateGame() {
    this.snake.update();

    if (this.ticksCount % 10 === 0) {
      const coordinates = findEmptyCell(
        gridWidth,
        gridHeight,
        cellWidth,
        cellHeight,
        this.snake.getSnakePositions(),
        getPositions(this.elements.getChildren()),
      );
      // spawn food
      if (coordinates) {
        this.spawnRemovable(coordinates);
      }
    }
    if (this.ticksCount % 40 === 0) {
      // spawn cat
    }

    this.ticksCount++;
  }

  spawnRemovable(point: Phaser.Math.Vector2) {
    const removable = this.physics.add
      .sprite(point.x - cellWidth / 2, point.y - cellHeight / 2, "lightning")
      .setOrigin(0, 0)
      // .setDisplaySize(this.width, this.height)
      .setCollideWorldBounds(true)
      .setScale(0.5);

    removable.body.setSize(removable.width * 0.4, removable.height * 0.4);

    // Add the head sprite to the snake body group
    this.elements.add(removable);
  }

  // snakeHead: Phaser.Types.Physics.Arcade.GameObjectWithBody | Tile
  private handleFoodCollision(
    _: unknown,
    object: Phaser.Types.Physics.Arcade.GameObjectWithBody | Tile,
  ) {
    console.log("Snake ate the food!");
    object.destroy();

    const newScore = this.registry.get("score") + 10;
    this.registry.set("score", newScore);

    this.scoreLabel.text = newScore;

    this.snake.addSegment();
  }
}
