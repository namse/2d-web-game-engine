import Box from "../../../src/Box";
import Vector from "../../../src/Vector";
import Text from "../../../src/Text";
import Image from "../../../src/Image";
import loadImage from "../../../src/loadImage";
import { MouseHandler, MouseEventType } from "../../../src/MouseController";
import state from "./state";

class AssetTile extends Image implements MouseHandler {
  onMouseEvent(mouseEventType: MouseEventType, mouseLocation: Vector): void {
    if (mouseEventType === MouseEventType.MouseDown) {
      state.brush = {
        assetImage: this.image,
        x: this.sourceX,
        y: this.sourceY,
      };
    }
  }
}

export default class AssetMenu extends Box {
  readonly titleFontSize: number = 20;
  readonly titleMargin: number = 10;
  private tileImages: Image[] = [];
  static readonly tileSize: number = 64;
  static readonly columnCount = 3;
  private assetBox: Box;
  constructor(
    location: Vector,
    size: Vector,
  ) {
    super(location, size);
    this.addTitle();
    this.addAssetBox();

    this.loadAssets();
  }
  private async loadAssets() {
    const assetImage = await loadImage('asset1.png');
    for (let y = 0; y < assetImage.height; y += AssetMenu.tileSize) {
      for (let x = 0; x < assetImage.width; x += AssetMenu.tileSize) {
        const tileImage = new AssetTile(new Vector(0, 0), new Vector(64, 64), assetImage, x, y);
        this.tileImages.push(tileImage);
      }
    }

    this.tileImages.forEach((tileImage, index) => {
      const x = (index % AssetMenu.columnCount) * AssetMenu.tileSize;
      const y = (Math.floor(index / AssetMenu.columnCount)) * AssetMenu.tileSize;
      tileImage.location = new Vector(x, y);
      this.assetBox.addChildren(tileImage);
    });
  }
  private addTitle() {
    const layerTitle = new Text(new Vector(this.size.x / 2, this.titleMargin), 'Assets', this.titleFontSize);
    this.addChildren(layerTitle);
  }
  private addAssetBox() {
    const titleHeight = 2 * this.titleMargin + this.titleFontSize;
    this.assetBox = new Box(new Vector(0, 2 * this.titleMargin + this.titleFontSize), this.size.SubXY(titleHeight, titleHeight));
    this.addChildren(this.assetBox);
  }
}
