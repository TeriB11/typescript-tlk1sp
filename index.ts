// Notes: https://docs.google.com/document/d/1cBwIdYJFsHRxEWFGVePqYNjhXMbU0u7NnFTq5ZfL-Mo/edit?usp=sharing

import { Canvas } from './src/Canvas';
import { Color } from './src/Color';
import { createBreak, createButton, createRadioInput } from './src/HTMLHelpers';
import { createSlider } from './src/HTMLSlider';
import { Rect } from './src/Rect';
import { Vec2 } from './src/Vec2';

const goldenRatio = (1 + Math.sqrt(5)) / 2;
let TURN_STEP = goldenRatio;
// Approximation of PI, overlayed in white
let APPOX_TURN_STEP = 0;

let STEP_SPEED = 0.00001;
let POINTS_COUNT = 1660;
let ZOOM_FACTOR = 0.171;
let POINT_DIST = 0.005;
let IS_RUNNING = true;

function drawTurnAngleFactor(turnPercentage: number, col?: Color) {
  for (let i = 0; i < POINTS_COUNT; i++) {
    const dist = i * POINT_DIST * ZOOM_FACTOR;
    const turnStep = 2 * Math.PI * turnPercentage;
    const pos = Vec2.polar(turnStep * i, dist);
    const color = col ?? Color.rainbow(i / POINTS_COUNT);
    const radius = Math.max(0.01, Math.min(0.04, 0.02 * ZOOM_FACTOR));
    canvas.drawCircle(pos, radius, color);
  }
}

// **************************************
// Sliders
// **************************************

const createInputs = () => {
  return [
    createBreak(),
    createButton(IS_RUNNING ? 'Pause' : 'Play', (setText) => {
      togglePause();
    }),
    createButton('-Step (A)', () => {
      step({ isPositive: false, updateSliders: true });
    }),
    createButton('+Step (D)', () => {
      step({ isPositive: true, updateSliders: true });
    }),
    createButton('Art', () => {
      TURN_STEP = goldenRatio;
      APPOX_TURN_STEP = 0;
      POINTS_COUNT = 1660;
      ZOOM_FACTOR = 0.171;
      POINT_DIST = 0.005;
      updateCanvasAndInputs();
    }),
    createButton('Golden Ratio', () => {
      TURN_STEP = goldenRatio;
      APPOX_TURN_STEP = 0;
      POINTS_COUNT = 1660;
      ZOOM_FACTOR = 0.112;
      POINT_DIST = 0.005;
      updateCanvasAndInputs();
    }),
    createButton('1/4', () => {
      TURN_STEP = 0.25;
      APPOX_TURN_STEP = 0;
      POINTS_COUNT = 1660;
      ZOOM_FACTOR = 0.112;
      POINT_DIST = 0.005;

      updateCanvasAndInputs();
    }),
    createButton('1/6', () => {
      TURN_STEP = 1 / 6;
      APPOX_TURN_STEP = 0;
      POINTS_COUNT = 1660;
      ZOOM_FACTOR = 0.112;
      POINT_DIST = 0.005;
      updateCanvasAndInputs();
    }),
    createButton('PI, 7 spokes', () => {
      TURN_STEP = Math.PI;
      ZOOM_FACTOR = 0.3;
      POINTS_COUNT = 5000;
      POINT_DIST = 0.005;
      updateCanvasAndInputs();
    }),
    createButton('PI, 113 spokes', () => {
      TURN_STEP = Math.PI; // 3.14159265359
      ZOOM_FACTOR = 0.037;
      POINTS_COUNT = 5000;
      POINT_DIST = 0.005;
      updateCanvasAndInputs();
    }),
    createBreak(),
    createRadioInput('≈PI 22/7', APPOX_TURN_STEP === 22 / 7, () => {
      TURN_STEP = Math.PI;
      APPOX_TURN_STEP = 22 / 7;
      IS_RUNNING && togglePause();
      ZOOM_FACTOR = 0.037;
      POINTS_COUNT = 5000;
      POINT_DIST = 0.005;
      updateCanvasAndInputs();
    }),
    createRadioInput('≈PI 333/106', APPOX_TURN_STEP === 333 / 106, () => {
      TURN_STEP = Math.PI;
      APPOX_TURN_STEP = 333 / 106;
      ZOOM_FACTOR = 0.037;
      POINTS_COUNT = 5000;
      POINT_DIST = 0.005;
      IS_RUNNING && togglePause();
      updateCanvasAndInputs();
    }),
    createRadioInput('≈PI 355/113', APPOX_TURN_STEP === 355 / 113, () => {
      TURN_STEP = Math.PI;
      APPOX_TURN_STEP = 355 / 113;
      ZOOM_FACTOR = 0.037;
      POINTS_COUNT = 5000;
      POINT_DIST = 0.005;
      IS_RUNNING && togglePause();
      updateCanvasAndInputs();
    }),
    createRadioInput(
      '≈PI 103993/33102',
      APPOX_TURN_STEP === 103993 / 33102,
      () => {
        TURN_STEP = Math.PI;
        APPOX_TURN_STEP = 103993 / 33102;
        ZOOM_FACTOR = 0.037;
        POINTS_COUNT = 5000;
        POINT_DIST = 0.005;
        IS_RUNNING && togglePause();
        updateCanvasAndInputs();
      }
    ),
    createRadioInput('None', APPOX_TURN_STEP === 0, () => {
      APPOX_TURN_STEP = 0;
      updateCanvasAndInputs();
    }),
    createBreak(),
    createSlider(
      {
        min: 0,
        max: 2,
        stepSize: 0.0001,
        initialValue: TURN_STEP,
        label: 'Turn Step %',
      },
      (newValue) => {
        TURN_STEP = newValue;
        canvas.update();
      }
    ),
    createSlider(
      {
        min: 0.00001,
        max: 0.0001,
        stepSize: 0.000001,
        initialValue: STEP_SPEED,
        label: 'Step Speed',
      },
      (newValue) => {
        STEP_SPEED = newValue;
        canvas.update();
      }
    ),
    createSlider(
      {
        min: 0.0001,
        max: 0.02,
        stepSize: 0.0001,
        initialValue: POINT_DIST,
        label: 'Points Distance',
      },
      (newValue) => {
        POINT_DIST = newValue;
        canvas.update();
      }
    ),
    createSlider(
      {
        min: 0.001,
        max: 6.0,
        stepSize: 0.001,
        initialValue: ZOOM_FACTOR,
        label: 'Zoom',
      },
      (newValue) => {
        ZOOM_FACTOR = newValue;
        canvas.update();
      }
    ),
    createSlider(
      {
        min: 1,
        max: 10000,
        stepSize: 1,
        initialValue: POINTS_COUNT,
        label: 'Points',
      },
      (newValue) => {
        POINTS_COUNT = newValue;
        canvas.update();
      }
    ),
  ];
};

// **************************************
// Canvas Lifecyle - Generic
// **************************************

function updateCanvasAndInputs() {
  const div = document.getElementById('userInput')!;
  div.innerHTML = '';
  div.append(...createInputs());
  canvas.update();
}

function togglePause() {
  IS_RUNNING = !IS_RUNNING;
  canvas.setRenderLoop(IS_RUNNING, 1000 / 30, () => {
    // Can't updateSliders because then the buttons won't work, since they'd be recreated every frame.
    step({ isPositive: true, updateSliders: false });
  });
  updateCanvasAndInputs();
}

const canvas = new Canvas(document.getElementById('canvasContainer')!, {
  size: {
    autoresize: true,
    maxCanvasWidth: window.innerHeight > 600 ? window.innerHeight - 200 : 0,
  },
});
canvas.onKeyDown = ({ key }) => {
  if (key === 'd') {
    step({ isPositive: true, updateSliders: true });
  } else if (key === 'a') {
    step({ isPositive: false, updateSliders: true });
  }
};

updateCanvasAndInputs();
IS_RUNNING = !IS_RUNNING;
togglePause();

// **************************************
// Canvas Lifecyle - For this StackBlitz
// **************************************

function step(o: { isPositive: boolean; updateSliders: boolean }) {
  TURN_STEP += STEP_SPEED * (o.isPositive ? 1 : -1);
  o.updateSliders ? updateCanvasAndInputs() : canvas.update();
}

canvas.onUpdate = (c) => {
  c.clear(Color.grey(0.26));
  c.renderInViewport(
    {
      viewport: Rect.withCorners(new Vec2(-1, -1), new Vec2(1, 1)),
    },
    () => {
      drawTurnAngleFactor(TURN_STEP);
      if (APPOX_TURN_STEP > 0) {
        drawTurnAngleFactor(APPOX_TURN_STEP, Color.grey(0.9));
      }
    }
  );
};
