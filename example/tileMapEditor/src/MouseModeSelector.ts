import Box from "../../../src/Box";
import Vector from "../../../src/Vector";
import Text from "../../../src/Text";
import { MouseHandler, MouseEventType } from "../../../src/MouseController";
import state from "./state";
import { MouseMode } from "./MouseMode";

class Button extends Box implements MouseHandler {
  constructor(location: Vector, size: Vector, buttonText: string) {
    super(location, size);
    const text = new Text(new Vector(size.x / 2, 0), buttonText);
    this.addChildren(text);
  }
  callback: () => void;
  onMouseDown(callback: () => void) {
    this.callback = callback;
  }
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {
    if (this.callback && mouseEventType === MouseEventType.MouseDown) {
      this.callback();
    }
  }
}

export default class MouseModeSelector extends Box {
  currentModeText: Text;
  currentMouseMode: MouseMode;

  constructor(location: Vector, size: Vector) {
    super(location, size);

    this.currentModeText = new Text(new Vector(100, 0), '');
    this.addChildren(this.currentModeText);
    this.changeMode(MouseMode.Move);

    const moveButton = new Button(new Vector(20, 10), new Vector(30, 15), 'Move');
    moveButton.onMouseDown(() => {
      this.changeMode(MouseMode.Move);
    });
    this.addChildren(moveButton);

    const fillButton = new Button(new Vector(60, 10), new Vector(30, 15), 'Fill');
    fillButton.onMouseDown(() => {
      this.changeMode(MouseMode.Fill);
    });
    this.addChildren(fillButton);
  }
  changeMode(mouseMode: MouseMode) {
    this.currentMouseMode = mouseMode;
    this.currentModeText.setContent(`current mode: ${mouseMode}`);
    state.mouseMode = mouseMode;
  }
}
