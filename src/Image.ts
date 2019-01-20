import Sprite from "./Sprite";
import Vector from "./Vector";

export default class Image extends Sprite {
  constructor(
    location: Vector,
    size: Vector,
    protected image: HTMLImageElement,
    protected sourceX: number = 0,
    protected sourceY: number = 0,
  ) {
    super(location, size);
  }
  public setImage(image: HTMLImageElement) {
    this.image = image;
  }
  protected draw() {
    if (!this.image) {
      return;
    }
    this.ctx.drawImage(
      this.image,
      this.sourceX,
      this.sourceY,
      this.size.x,
      this.size.y,
      0,
      0,
      this.size.x,
      this.size.y,
    );
  }
}
