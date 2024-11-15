import * as ex from 'excalibur';
import { loader } from './resources';
import { MyLevel } from './level';

const game = new ex.Engine({
  width: 200,
  height: 200,
  displayMode: ex.DisplayMode.FitScreenAndFill,
  // Pixel Art true does all the right things to render pixel art without
  // nearest neighbor shimmering artifacts
  pixelArt: true,
  pixelRatio: 4, // This will upscale the canvas
  scenes: {
    start: MyLevel
  },
  fixedUpdateFps: 60, // fixed update off by default but useful if consistent physics is important
  physics: {
    gravity: ex.vec(0, 800),
    // solver is "Arcade" by default which roughly axis aligned collisions preventing overlap only
    // "Realistic" is things bouncing off each other, friction, and rotation.
    // solver: ex.SolverStrategy.Realistic
  }
});

game.start(loader).then(() => {

  // Up scaling work-around for pixelart games that have small res like 200x200 - fixed in v0.30
  // pixelRatio: 4 should "just work" in the future
  game.screen.pixelRatioOverride = 4;
  game.screen.applyResolutionAndViewport();

  game.goToScene('start');
})

