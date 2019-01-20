import Box from "../../../src/Box";
import Vector from "../../../src/Vector";
import ScrollBox from "../../../src/ScrollBox";
import { MouseHandler, MouseEventType } from "../../../src/MouseController";
import { MouseMode } from "./MouseMode";
import state from "./state";
import Image from "../../../src/Image";

class Tile extends Image implements MouseHandler {
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {
    if (mouseEventType !== MouseEventType.MouseDown || !state.brush || state.mouseMode !== MouseMode.Fill) {
      return;
    }
    this.setImage(state.brush.assetImage);
    this.sourceX = state.brush.x;
    this.sourceY = state.brush.y;
  }
}

export default class TileMap extends ScrollBox implements MouseHandler {
  private mapSize: Vector;
  static readonly tileSize = new Vector(64, 64);
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

        const tile = new Tile(box.location, box.size, undefined);
        this.addChildren(tile);
      }
    }
  }
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {
    if (state.mouseMode === MouseMode.Move) {
      super.onMouseEvent(mouseEventType, mouseLocation);
    }
  }
}
