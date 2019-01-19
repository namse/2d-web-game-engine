import Sprite from "./Sprite";
import Vector from "./Vector";

export default class Image extends Sprite {
  constructor(
    location: Vector,
    size: Vector,
    private image: HTMLImageElement,
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
      -(this.image.width / 2) + this.location.x,
      -(this.image.height / 2) + this.location.y,
    );
  }
}
