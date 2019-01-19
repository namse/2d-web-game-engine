import Vector from "./Vector";
import Thing from "./Thing";
import { getContext } from "./CanvasManager";

export default abstract class Sprite extends Thing {
  protected ctx: CanvasRenderingContext2D;
  constructor(
    location: Vector,
    size: Vector,
  ) {
    super(location, size);
  }

  protected beforeTick(dt: number) {
    super.beforeTick(dt);
    if (!this.ctx) {
      this.ctx = getContext();
    }
    this.ctx.save();

    this.ctx.translate(this.location.x, this.location.y);

    this.draw();
  }
  protected afterTick(dt: number) {
    super.afterTick(dt);
    this.ctx.restore();
  }

  protected abstract draw(): void;
}
