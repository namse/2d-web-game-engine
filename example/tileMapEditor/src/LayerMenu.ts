import Box from "../../../src/Box";
import Vector from "../../../src/Vector";
import Text from "../../../src/Text";
import { MouseHandler, MouseEventType } from "../../../src/MouseController";

class LayerBox extends Box implements MouseHandler {
  static layerBoxHeight: number = 20;
  constructor(
    location: Vector,
    size: Vector,
    private name: string,
    protected layerMenu: LayerMenu,
  ) {
    super(location, size);

    const fontSize = 10;
    const nameText = new Text(new Vector(this.size.x / 2, this.size.y / 2 - fontSize / 2), name);
    this.addChildren(nameText);
  }
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {

  }
}

class AddLayerButtonBox extends LayerBox implements MouseHandler {
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {
    switch (mouseEventType) {
      case MouseEventType.MouseDown: {
        this.layerMenu.addLayer('test');
      } break;
    }
  }
}

export default class LayerMenu extends Box {
  private layerBoxes: LayerBox[] = [];
  readonly titleFontSize: number = 20;
  readonly titleMargin: number = 10;
  private addLayerButtonBox: AddLayerButtonBox;
  constructor(
    location: Vector,
    size: Vector,
  ) {
    super(location, size);
    this.addLayerButtonBox = new AddLayerButtonBox(
      new Vector(0, this.titleMargin * 2 + this.titleFontSize),
      new Vector(this.size.x, LayerBox.layerBoxHeight),
      '+',
      this,
    );
    this.addChildren(this.addLayerButtonBox);

    this.addTitle();
  }
  private addTitle() {
    const layerTitle = new Text(new Vector(this.size.x / 2, this.titleMargin), 'Layers', this.titleFontSize);
    this.addChildren(layerTitle);
  }
  public addLayer(name: string = '') {
    const boxY = this.layerBoxes.length * LayerBox.layerBoxHeight + this.titleMargin * 2 + this.titleFontSize;
    const layerBox = new AddLayerButtonBox(new Vector(0, boxY), new Vector(this.size.x, LayerBox.layerBoxHeight), name, this);
    this.layerBoxes.push(layerBox);
    this.addChildren(layerBox);

    this.addLayerButtonBox.location = new Vector(0, boxY + LayerBox.layerBoxHeight);
  }
}
