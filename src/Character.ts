import Image from "./Image";
import Vector from "./Vector";

export default class Character extends Image {
  public move(vector: Vector) {
    this.speed = vector.toUnitVector().scale(this.velocity);
  }
}
