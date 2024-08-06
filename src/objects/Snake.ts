import { getPositions } from "../helpers";
import {
  cellHeight,
  cellWidth,
  gridHeight,
  gridPadding,
  gridTopOffset,
  gridWidth,
} from "../settings.ts";

export class Snake {
  public snakeObserver = new Phaser.Events.EventEmitter();
  private snakeBody: Phaser.Physics.Arcade.Group;
  private snakeSegments: Phaser.Physics.Arcade.Sprite[] = [];
  private direction: Phaser.Math.Vector2;
  private pendingDirection: Phaser.Math.Vector2 | null;
  private isAlive = true;

  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
    private width: number,
    private height: number,
  ) {
    {
      this.direction = new Phaser.Math.Vector2(0, 0);
      this.pendingDirection = null;

      this.snakeBody = this.scene.physics.add.group();

      this.createHead(x, y);

      // TODO: fix the bug with adding the first segment, when collisions have place
      scene.physics.add.collider(
        this.getHead(),
        this.snakeSegments,
        this.handleTailCollision,
        undefined,
        this,
      );
    }
  }

  // TODO: fix the bug with adding the first segment
  public addSegment() {
    // Get the position of the last segment to place the new segment
    const lastSegment = this.snakeSegments[this.snakeSegments.length - 1];

    const newSegment = this.scene.physics.add
      .sprite(lastSegment.x, lastSegment.y, "lightning")
      .setOrigin(0, 0)
      .setScale(0.5)
      .setCollideWorldBounds(true);
    newSegment.body.setSize(newSegment.width * 0.4, newSegment.height * 0.4);

    this.snakeBody.add(newSegment);
    this.snakeSegments.push(newSegment);
  }

  setDirection(newDirection: Phaser.Math.Vector2) {
    if (
      this.snakeBody.children.size !== 1 &&
      (newDirection.x === -this.direction.x ||
        newDirection.y === -this.direction.y)
    ) {
      return; // Prevent reversing direction
    }

    this.pendingDirection = newDirection;
  }

  public getHead(): Phaser.Physics.Arcade.Sprite {
    return this.snakeBody.getFirst(true) as Phaser.Physics.Arcade.Sprite;
  }

  killTheSnake() {
    this.isAlive = false;
    this.direction = new Phaser.Math.Vector2(0, 0);
    this.pendingDirection = null;

    this.snakeObserver.emit("isAlive", this.isAlive);
  }

  toggleAlive() {
    if (this.isAlive) {
      this.killTheSnake();
    } else {
      this.isAlive = true;
    }

    console.log(this.isAlive ? "Resurrected" : "Killed");
  }

  getSnakePositions(): Phaser.Math.Vector2[] {
    return getPositions(this.snakeBody.getChildren());
  }

  update() {
    if (!this.isAlive) {
      return;
    }

    if (this.pendingDirection) {
      this.direction = this.pendingDirection;
      this.pendingDirection = null;
    }

    this.moveSnake();
  }

  private handleTailCollision() {
    if (this.snakeSegments.length > 2 ?? this.isAlive) {
      this.killTheSnake();
    }
  }

  private createHead(x: number, y: number) {
    // Add the head sprite using the 'lightning' image key
    const head = this.scene.physics.add
      .sprite(x - this.width / 2, y - this.height / 2, "lightning")
      .setOrigin(0, 0) // Встановлюємо центр як точку прив'язки
      // .setDisplaySize(this.width, this.height)
      .setCollideWorldBounds(true)
      .setScale(0.5);

    head.body.setSize(head.width * 0.4, head.height * 0.4);

    // Add the head sprite to the snake body group
    this.snakeBody.add(head);
    this.snakeSegments.push(head);
  }

  private moveSnake() {
    const head = this.snakeBody.getFirst(true) as Phaser.Physics.Arcade.Sprite;
    const newX = head.x + this.direction.x * this.width;
    const newY = head.y + this.direction.y * this.height;

    const minX = gridPadding + cellWidth;
    const minY = gridTopOffset - cellHeight;
    const maxX = gridPadding + (gridWidth - 1) * cellWidth;
    const maxY = gridTopOffset + (gridHeight - 1) * cellHeight;

    if (newX < minX || newY < minY || newX >= maxX || newY >= maxY) {
      console.log("Game Over");
      return this.killTheSnake();
    }

    for (let i = this.snakeSegments.length - 1; i > 0; i--) {
      const currentSegment = this.snakeSegments[i];
      const nextSegment = this.snakeSegments[i - 1];
      currentSegment.setPosition(nextSegment.x, nextSegment.y);
    }

    head.setPosition(newX, newY);
  }
}
