import { expect, test } from "vitest";
import { draw } from "../src/draw";
import { offset } from "../src/offsetOperations";
import { exportJSON } from "../src/export/json/exportJSON";

const ex1Vertexes: [number, number, number][] = [
  [100, 100, -0.5],
  [80, 90, 0.374794619217547],
  [210, 0, 0],
  [230, 0, 1],
  [320, 0, -0.5],
  [280, 0, 0.5],
  [390, 210, 0],
  [280, 120, 0.5],
];

const ex2Vertexes: [number, number, number][] = [
  [0, 25, 1],
  [0, 0, 0],
  [2, 0, 1],
  [10, 0, -0.5],
  [8, 9, 0.374794619217547],
  [21, 0, 0],
  [23, 0, 1],
  [32, 0, -0.5],
  [28, 0, 0.5],
  [39, 21, 0],
  [28, 12, 0],
];

const drawVertexes = (vertexes: [number, number, number][]) => {
  const [x0, y0, b0] = vertexes[0];
  const d = draw([x0, y0]);

  let bulge = b0;

  for (let i = 1; i < vertexes.length; i++) {
    const [x, y, b] = vertexes[i];
    d.bulgeArcTo([x, y], bulge);
    bulge = b;
  }
  d.bulgeArcTo([x0, y0], bulge);
  return d.close();
};

test.each([-75, -50, -25, -10, -1, 1, 10, 25, 50])(
  "offset complex shape 1, with offset %d",
  (offsetVal) => {
    const d = drawVertexes(ex1Vertexes);
    const offsetD = offset(d, offsetVal);

    expect(exportJSON(offsetD)).toMatchSnapshot();
  },
);

test.each([-10, -7, -5, -2, -1, 1, 20])(
  "offset complex shape 2, with offset %d",
  (offsetVal) => {
    const d = drawVertexes(ex2Vertexes);
    const offsetD = offset(d, offsetVal);

    expect(exportJSON(offsetD)).toMatchSnapshot();
  },
);
