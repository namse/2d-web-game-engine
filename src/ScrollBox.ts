import Sprite from "./Sprite";
import Vector from "./Vector";
import { MouseEventType } from "./MouseController";

export default class ScrollBox extends Sprite {
  private isMouseDown: boolean = false;
  private lastMouseLocation: Vector;
  public isScrollEnable: boolean = true;
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
    if (!this.isScrollEnable) {
      return;
    }
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
