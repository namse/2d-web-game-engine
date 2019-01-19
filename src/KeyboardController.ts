import Character from "./Character";
import Vector from "./Vector";

export default class KeyboardMouseController {
  private character: Character;
  private isKeyPressed: {[key: string]: boolean} = {};
  constructor() {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      this.onKeyDown(event.key);
    });
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      this.onKeyUp(event.key);
    });
  }
  public setCharacter(character: Character) {
    this.character = character;
  }
  private onKeyDown(key: string) {
    this.isKeyPressed[key] = true;
    if (!this.character) {
      return;
    }
    this.moveChracter();
  }
  private onKeyUp(key: string) {
    this.isKeyPressed[key] = false;
    if (!this.character) {
      return;
    }
    this.moveChracter();
  }

  private moveChracter() {
    let vx: number = 0;
    if (this.isKeyPressed['a']) {
      vx -= 1;
    }
    if (this.isKeyPressed['d']) {
      vx += 1;
    }

    let vy: number = 0;
    if (this.isKeyPressed['w']) {
      vy -= 1;
    }
    if (this.isKeyPressed['s']) {
      vy += 1;
    }
    this.character.move(new Vector(vx, vy));
  }
}
