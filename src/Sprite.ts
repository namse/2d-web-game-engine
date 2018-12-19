import Vector from "./Vector";
import Thing from "./Thing";
import { getContext } from "./CanvasManager";

export default abstract class Sprite extends Thing {
  protected ctx: CanvasRenderingContext2D;
  constructor(
    protected location: Vector,
  ) {
    super(location);
  }

  protected beforeTick(dt: number) {
    super.beforeTick(dt);
    if (!this.ctx) {
      this.ctx = getContext();
    }
    this.ctx.save();

    this.draw();

    this.ctx.translate(this.location.x, this.location.y);
  }
  protected afterTick(dt: number) {
    super.afterTick(dt);
    this.ctx.restore();
  }

  protected abstract draw(): void;
}
