import Sprite from "./Sprite";
import Vector from "./Vector";

export default class Image extends Sprite {
  constructor(
    location: Vector,
    size: Vector,
    private image: HTMLImageElement,
    private sourceX: number = 0,
    private sourceY: number = 0,
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
      -this.anchor.x,
      -this.anchor.y,
      this.size.x,
      this.size.y,
    );
  }
}
