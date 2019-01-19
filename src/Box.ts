import Sprite from "./Sprite";

export default class Box extends Sprite {
  protected draw() {
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(
      0,
      0,
      this.size.x,
      this.size.y,
    );
  }
}
