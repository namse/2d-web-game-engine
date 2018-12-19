import Vector from "./Vector";

export default class Thing {
  protected children: Thing[] = [];
  protected parent: Thing = null;
  constructor(
    protected location: Vector = new Vector(0, 0),
  ) {

  }
  public tick() {
    this.children.forEach(child => {
      child.tick();
    });
  }
  public addChildren(...things: Thing[]) {
    this.children.push(...things);
    things.forEach((thing) => {
      thing.setParent(this);
    });
  }
  private setParent(parent: Thing) {
    this.parent = parent;
  }
  public getGlobalCoordinate(): Vector {
    if (!this.parent) {
      return this.location;
    }
    return this.location.AddVector(this.parent.location);
  }
}
