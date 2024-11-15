import * as ex from 'excalibur';
import { Resources } from './resources';

const random = new ex.Random(1337);

export class Block extends ex.Actor {
    constructor(x: number, y: number) {
        super({
            pos: ex.vec(x, y),
            width: 32,
            height: 32,
            color: new ex.Color(random.integer(0, 255), random.integer(0, 255), random.integer(0, 255)),
            collisionType: ex.CollisionType.Active
        })

        const blockSprite = Resources.SmallBlock.toSprite();
        blockSprite.destSize.width = this.width;
        blockSprite.destSize.height = this.height;
        this.graphics.use(blockSprite);
    }
}