import * as ex from 'excalibur';
import { Player } from './player';
import { Ground } from './ground';
import { Block } from './block';


export class MyLevel extends ex.Scene {

  player!: Player;
  floor!: Ground;

  override onInitialize(): void {
    this.player = new Player(100, 100);
    this.add(this.player);

    this.floor = new Ground();
    this.add(this.floor);

    this.add(new Block(200, 100));

    // Built in strategies allow the camera to follow actors
    this.camera.strategy.elasticToActor(this.player, .9, .91);
  }

}
