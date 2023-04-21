import { Strand } from "../../models/Strand";
import { Diagram } from "../../models/Diagram";
import { Figure } from "../../models/Figure";
import { Loop } from "../../models/Loop";
import { Arc } from "../../models/segments/Arc";
import { Line } from "../../models/segments/Line";
import { svgDiagram } from "./svgDiagram";
import { svgFigure } from "./svgFigure";
import { svgLoop } from "./svgLoop";
import { svgSegmentToPath } from "./svgSegment";
import { svgStrand } from "./svgStrand";
import { wrapSVG } from "./wrapSVG";

type Shape = Loop | Figure | Diagram | Arc | Line | Strand;

export function svgBody(shape: Shape) {
  if (shape instanceof Diagram) {
    return svgDiagram(shape);
  } else if (shape instanceof Figure) {
    return svgFigure(shape);
  } else if (shape instanceof Loop) {
    return `<path d="${svgLoop(shape)}" />`;
  } else if (shape instanceof Strand) {
    return `<path d="${svgStrand(shape)}" />`;
  } else if (shape instanceof Arc || shape instanceof Line) {
    return `<path d="${`M ${shape.firstPoint.join(" ")}`} ${svgSegmentToPath(
      shape
    )}" />`;
  } else {
    throw new Error("Unknown shape type");
  }
}

type ConfiguredShape = Shape | { shape: Shape; color?: string };

const extractShape = (shape: ConfiguredShape) =>
  "shape" in shape ? shape.shape : shape;

const addConfig = (shape: ConfiguredShape, body: string) => {
  if (!("shape" in shape)) return body;
  const { color } = shape;
  if (!color) return body;
  return `<g stroke="${color}">${body}</g>`;
};

export function exportSVG(
  shape: ConfiguredShape | ConfiguredShape[],
  margin = 1
) {
  if (Array.isArray(shape)) {
    const flipped = shape.map((s) => extractShape(s).mirror());
    const body = flipped
      .map((s, i) => addConfig(shape[i], svgBody(s)))
      .join("\n");
    const bbox = flipped
      .slice(1)
      .reduce((bbox, s) => bbox.merge(s.boundingBox), flipped[0].boundingBox);

    return wrapSVG(body, bbox);
  }
  const flipped = extractShape(shape).mirror();
  return wrapSVG(
    addConfig(shape, svgBody(flipped)),
    flipped.boundingBox,
    margin
  );
}
