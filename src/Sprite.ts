import Vector from "./Vector";
import Thing from "./Thing";
import { getContext } from "./CanvasManager";

export default class Sprite extends Thing {
  constructor(
    protected location: Vector,
  ) {
    super(location);
  }

  public tick() {
    const ctx = getContext();
    ctx.save();

    this.draw();

    ctx.translate(this.location.x, this.location.y);

    this.children.forEach(child => {
      child.tick();
    });

    ctx.restore();
  }

  private draw() {
    const ctx = getContext();
    const r = 30;
    ctx.beginPath();
    ctx.ellipse(
      this.location.x + r,
      this.location.y + r,
      r,
      r,
      0,
      0,
      360,
    );
    ctx.stroke();
  }
}
