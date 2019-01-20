import Vector from "./Vector";

export default class Thing {
  public children: Thing[] = [];
  protected parent: Thing = null;
  protected speed: Vector = new Vector(0, 0);
  protected velocity: number = 100;
  constructor(
    public location: Vector = new Vector(0, 0),
    public size: Vector = new Vector(0, 0),
    public anchor: Vector = new Vector(0, 0),
  ) {
  }
  public getLeftTop(): Vector {
    return this.location.SubVector(this.anchor);
  }
  public getWorldLeftTop(): Vector {
    let ret = this.getLeftTop();
    let parent = this.parent;
    while (parent) {
      ret = ret.AddVector(parent.getLeftTop());
      parent = parent.parent;
    }
    return ret;
  }
  public getWorldLocation(): Vector {
    let ret = this.location;
    let parent = this.parent;
    while (parent) {
      ret = ret.AddVector(parent.location);
      parent = parent.parent;
    }
    return ret;
  }
  public getSize(): Vector {
    return this.size;
  }
  protected beforeTick(dt: number) {
    this.updateLocation(dt);
  }
  public tick(dt: number) {
    this.beforeTick(dt);
    this.children.forEach(child => {
      child.tick(dt);
    });
    this.afterTick(dt);
  }
  protected afterTick(dt: number) {}
  private updateLocation(dt: number) {
    this.location = this.location.AddVector(this.speed.scale(dt));
  }
  public addChildren(...things: Thing[]) {
    this.children.push(...things);
    things.forEach((thing) => {
      thing.setParent(this);
    });
  }
  public removeChild(index: number): Thing | undefined {
    return this.children.splice(index, 1)[0];
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
