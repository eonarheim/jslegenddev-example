import * as ex from 'excalibur';
import { CalSpriteSheet, Resources } from './resources';

export class Player extends ex.Actor {
  randomProperty = "test";
  idleLeftAnimation: ex.Animation;
  idleRightAnimation: ex.Animation;
  walkRightAnimation: ex.Animation;
  walkLeftAnimation: ex.Animation;
  currentDir: 1 | -1 = 1;
  isOnGround: boolean = false;
  constructor(x: number, y: number) {
    super({
      pos: ex.vec(x, y),
      width: 20,
      height: 29,
      collisionType: ex.CollisionType.Active,
    });
    this.body.limitDegreeOfFreedom = [ex.DegreeOfFreedom.Rotation];

    this.idleLeftAnimation = ex.Animation.fromSpriteSheet(CalSpriteSheet, [2, 3], 500, ex.AnimationStrategy.Loop);
    this.idleRightAnimation = this.idleLeftAnimation.clone();
    this.idleRightAnimation.flipHorizontal = true;

    this.walkLeftAnimation = ex.Animation.fromSpriteSheet(CalSpriteSheet, [4, 5, 6, 7], 100, ex.AnimationStrategy.Loop);
    this.walkRightAnimation = this.walkLeftAnimation.clone();
    this.walkRightAnimation.flipHorizontal = true;
  }

  override onInitialize(engine: ex.Engine): void {
    this.graphics.use(this.idleLeftAnimation);

    engine.input.keyboard.on('hold', (evt) => {
      if (evt.key === ex.Keys.ArrowLeft) {
        this.walk(-1);
      }
      if (evt.key === ex.Keys.ArrowRight) {
        this.walk(1);
      }

      if (evt.key === ex.Keys.Space) {
        this.jump();
      }
    });

    engine.input.keyboard.on('release', evt => {
      if (evt.key === ex.Keys.ArrowLeft || evt.key === ex.Keys.ArrowRight) {
        this.vel.x = 0;
        this.graphics.use(this.currentDir > 0 ? this.idleRightAnimation : this.idleLeftAnimation);
      }
    });
  }

  override onCollisionStart(self: ex.Collider, other: ex.Collider, side: ex.Side, contact: ex.CollisionContact): void {
    if (side === ex.Side.Bottom) {
      this.isOnGround = true;
    }
  }


  walk(dir: 1 | -1) {
    this.currentDir = dir;
    this.currentDir > 0 ? this.graphics.use(this.walkRightAnimation) : this.graphics.use(this.walkLeftAnimation);
    this.vel.x = 100 * this.currentDir;
  }

  jump() {
    if (this.isOnGround) {
      this.vel.y = -300;
      this.isOnGround = false;
    }
  }
}

