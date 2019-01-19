import Thing from "./Thing";
import Vector from "./Vector";
import world from "./world";
import { getCanvasElement } from "./CanvasManager";

export interface MouseHandler {
  onMouseEvent(mouseLocation: Vector): void;
}

export default class MouseController {
  constructor() {
    const canvasElement = getCanvasElement();
    if (!canvasElement) {
      throw new Error('Cannot get canvas element. Set canvas element before make mouseController');
    }
    canvasElement.addEventListener('mousedown', (event: MouseEvent) => {
      const mouseLocaiton = new Vector(
        event.pageX - canvasElement.offsetLeft,
        event.pageY - canvasElement.offsetTop,
      );
      this.propagateMouseEvent(world, mouseLocaiton);
    });
  }
  private propagateMouseEvent(target: Thing, mouseLocation: Vector) {
    const targetWorldLeftTop = target.getWorldLeftTop();
    const targetSize = target.getSize();

    const isXInsideOfRect = targetWorldLeftTop.x <= mouseLocation.x && mouseLocation.x <= targetWorldLeftTop.x + targetSize.x;
    const isYInsideOfRect = targetWorldLeftTop.y <= mouseLocation.y && mouseLocation.y <= targetWorldLeftTop.y + targetSize.y;

    if ((target as any).onMouseEvent && isXInsideOfRect && isYInsideOfRect) {
      (target as any).onMouseEvent(mouseLocation);
      console.log(target);
    }

    target.children.forEach((child) => {
      this.propagateMouseEvent(child, mouseLocation);
    });
  }
}
