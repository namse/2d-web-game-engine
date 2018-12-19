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
}
