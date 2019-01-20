import Box from "../../../src/Box";
import Vector from "../../../src/Vector";
import Sprite from "../../../src/Sprite";
import { MouseHandler, MouseEventType } from "../../../src/MouseController";

export default class TileMap extends Sprite implements MouseHandler {
  private mapSize: Vector;
  static readonly tileSize = new Vector(64, 64);
  private scroll = new Vector(0, 0);
  private isMouseDown: boolean = false;
  private lastMouseLocation: Vector;
  constructor(location: Vector, size: Vector) {
    super(location, size);

    this.setMapSize(new Vector(10, 10));
  }
  public setMapSize(size: Vector) {
    this.mapSize = new Vector(size.x, size.y);

    while (this.children.length) {
      this.removeChild(0);
    }

    for (let y = 0; y < size.y; y += 1) {
      for (let x = 0; x < size.x; x += 1 ) {
        const box = new Box(TileMap.tileSize.scale(x, y), TileMap.tileSize);
        this.addChildren(box);
      }
    }
  }
  public scrollTo(location: Vector) {
    this.scroll = location;
  }
  public scrollBy(delta: Vector) {
    this.scrollTo(this.scroll.AddVector(delta));
  }
  protected draw(): void {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'pink';
    this.ctx.rect(
      0,
      0,
      this.size.x,
      this.size.y,
    );
    this.ctx.stroke();
    this.ctx.clip();

    this.ctx.translate(-this.scroll.x, -this.scroll.y);
  }
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {
    switch (mouseEventType) {
      case MouseEventType.MouseDown: {
        this.isMouseDown = true;
        this.lastMouseLocation = mouseLocation;
      } break;
      case MouseEventType.MouseMove: {
        if (!this.isMouseDown) {
          break;
        }
        const delta = this.lastMouseLocation.SubVector(mouseLocation);
        this.scrollBy(delta);
        this.lastMouseLocation = mouseLocation;
      } break;
      case MouseEventType.MouseLeave: {
        this.isMouseDown = false;
      } break;
      case MouseEventType.MouseUp: {
        this.isMouseDown = false;
      } break;
    }
  }
}
