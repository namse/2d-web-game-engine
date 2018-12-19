export default class Vector {
  constructor(public x: number, public y: number) {

  }
  AddXY(x: number, y: number): Vector {
    return new Vector(this.x + x, this.y + y);
  }
  AddVector(...vectors: Vector[]): Vector {
    const { x, y } = vectors.reduce(({ x: prevX, y: prevY }, vector) => {
      return {
        x: prevX + vector.x,
        y: prevY + vector.y,
      };
    }, {
      x: this.x,
      y: this.y,
    });
    return new Vector(x, y);
  }
  scale(factorOrX: number, factorY?: number): Vector {
    if (factorY !== 0 && !factorY) {
      return new Vector(this.x * factorOrX, this.y * factorOrX);
    }
    return new Vector(this.x * factorOrX, this.y * factorY);
  }
  toUnitVector(): Vector {
    const length = this.getLength();
    if (length === 0) {
      return new Vector(0, 0);
    }
    const x = this.x / length;
    const y = this.y / length;
    return new Vector(x, y);
  }
  getLength(): number {
    return ((this.x ** 2) + (this.y ** 2)) ** 0.5;
  }
}
