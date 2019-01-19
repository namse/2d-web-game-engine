import Sprite from './Sprite';
import Vector from './Vector';

export default class Text extends Sprite {
  constructor(
    location: Vector,
    private content: string,
    private fontSize: number = 10,
    private fontFamily: string = 'Arial',
  ) {
    super(location, new Vector(0, 0)); // TODO : change new Vector(0, 0), it is temp.
  }
  public setContent(content: string) {
    this.content = content;
  }
  protected draw(): void {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    this.ctx.fillText(this.content, 0, 0);
  }
}
