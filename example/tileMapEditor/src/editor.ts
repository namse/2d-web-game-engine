import { setCanvasElement, toggleFpsLog } from '../../../src/CanvasManager';
import world from "../../../src/world";
import Text from "../../../src/Text";
import Vector from '../../../src/Vector';
import LayerMenu from './LayerMenu';
import MouseController from '../../../src/MouseController';
import AssetMenu from './AssetMenu';
import TileMap from './TileMap';
import MouseModeSelector from './MouseModeSelector';

class Editor {
  title: Text;
  layerMenu: LayerMenu;
  assetMenu: AssetMenu;
  tileMap: TileMap;
  mouseModeSelector: MouseModeSelector;
  constructor() {
    const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    setCanvasElement(canvasElement);

    this.title = new Text(new Vector(250, 50), 'Tile-map Editor', 20);
    world.addChildren(this.title);

    this.layerMenu = new LayerMenu(new Vector(20, 100), new Vector(100, 400));
    world.addChildren(this.layerMenu);

    this.assetMenu = new AssetMenu(new Vector(140, 100), new Vector(AssetMenu.columnCount * AssetMenu.tileSize, 400));
    world.addChildren(this.assetMenu);

    this.tileMap = new TileMap(new Vector(this.assetMenu.location.x + this.assetMenu.size.x + 20, 100), new Vector(500, 500));
    world.addChildren(this.tileMap);

    this.mouseModeSelector = new MouseModeSelector(new Vector(this.tileMap.location.x, 60), new Vector(200, 30));
    world.addChildren(this.mouseModeSelector);

    const mouseController = new MouseController();

    // toggleFpsLog(true);
  }
}

const editor = new Editor();
export default editor;
