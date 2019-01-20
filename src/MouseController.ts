import Thing from "./Thing";
import Vector from "./Vector";
import world from "./world";
import { getCanvasElement } from "./CanvasManager";

export enum MouseEventType {
  MouseDown = 'MouseDown',
  MouseUp = 'MouseUp',
  MouseEnter = 'MouseEnter',
  MouseLeave = 'MouseLeave',
  MouseMove = 'MouseMove',
}

type CanvasMouseEvent = 'mousedown' | 'mouseup' | 'mousemove'
const canvasMouseEvents: CanvasMouseEvent[] = ['mousedown', 'mouseup', 'mousemove'];

export interface MouseHandler {
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void;
}

export default class MouseController {
  private previousMouseLocaiton: Vector = new Vector(Infinity, Infinity);
  constructor() {
    const canvasElement = getCanvasElement();
    if (!canvasElement) {
      throw new Error('Cannot get canvas element. Set canvas element before make mouseController');
    }
    canvasMouseEvents.forEach((canvasMouseEvent) => {
      canvasElement.addEventListener(canvasMouseEvent, (event: MouseEvent) => {
        const mouseLocaiton = new Vector(
          event.pageX - canvasElement.offsetLeft,
          event.pageY - canvasElement.offsetTop,
        );

        this.propagateMouseEvent(canvasMouseEvent, world, mouseLocaiton);

        this.previousMouseLocaiton = mouseLocaiton;
      });
    });
  }
  private isPointInsideOfRect(point: Vector, rectLeftTop: Vector, rectSize: Vector) {
    const isXInsideOfRect = rectLeftTop.x <= point.x && point.x <= rectLeftTop.x + rectSize.x;
    const isYInsideOfRect = rectLeftTop.y <= point.y && point.y <= rectLeftTop.y + rectSize.y;
    return isXInsideOfRect && isYInsideOfRect;
  }
  private isPointInsideOfThing(point: Vector, target: Thing) {
    const targetWorldLeftTop = target.getWorldLeftTop();
    const targetSize = target.getSize();

    return this.isPointInsideOfRect(point, targetWorldLeftTop, targetSize);
  }
  private propagateMouseEvent(canvasMouseEvent: CanvasMouseEvent, target: Thing, mouseLocation: Vector) {
    if ((target as any as MouseHandler).onMouseEvent) {
      const isMouseInsideOfTarget = this.isPointInsideOfThing(mouseLocation, target);
      const wasMouseInsideOfTarget = this.isPointInsideOfThing(this.previousMouseLocaiton, target);
      let event: MouseEventType;
      switch (canvasMouseEvent) {
        case 'mousedown': {
          if (isMouseInsideOfTarget) {
            event = MouseEventType.MouseDown;
          }
        } break;
        case 'mouseup': {
          if (isMouseInsideOfTarget) {
            event = MouseEventType.MouseUp;
          }
        } break;
        case 'mousemove': {
          if (!wasMouseInsideOfTarget && isMouseInsideOfTarget) {
            event = MouseEventType.MouseEnter;
          } else if (wasMouseInsideOfTarget && !isMouseInsideOfTarget) {
            event = MouseEventType.MouseLeave;
          } else if (wasMouseInsideOfTarget && isMouseInsideOfTarget) {
            event = MouseEventType.MouseMove;
          }
        } break;
      }
      if (event) {
        (target as any as MouseHandler).onMouseEvent(event, mouseLocation);
      }
    }


    target.children.forEach((child) => {
      this.propagateMouseEvent(canvasMouseEvent, child, mouseLocation);
    });
  }
}
