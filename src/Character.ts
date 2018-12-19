import Sprite from "./Sprite";
import Vector from "./Vector";

export default class Character extends Sprite {
  private image: HTMLImageElement;
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
  public move(vector: Vector) {
    this.speed = vector.toUnitVector().scale(this.velocity);
  }
}
