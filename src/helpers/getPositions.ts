import GameObject = Phaser.GameObjects.GameObject;

export function getPositions(objects: GameObject[]): Phaser.Math.Vector2[] {
    return objects.map((segment) => {
        const sprite = segment as Phaser.Physics.Arcade.Sprite;
        return new Phaser.Math.Vector2(sprite.x, sprite.y);
    });
}