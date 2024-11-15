import * as ex from 'excalibur';
import { Resources } from './resources';


export class Ground extends ex.Actor {

  constructor() {
    super({
      width: 600,
      height: 45,
      anchor: ex.vec(0, 0),
      pos: ex.vec(0, 400 - 40),
      collisionType: ex.CollisionType.Fixed,
      color: ex.Color.Black
    });

    
    const repeatingBlock = Resources.BlockImage.toSprite();
    repeatingBlock.sourceView.width = this.width;
    repeatingBlock.destSize.width = this.width;
    repeatingBlock.sourceView.height = this.height;
    repeatingBlock.destSize.height = this.height;
    this.graphics.use(repeatingBlock);
  }
}
