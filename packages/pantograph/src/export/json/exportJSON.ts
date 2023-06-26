import { Segment } from "../../main.js";
import { Diagram } from "../../models/Diagram.js";
import { Figure } from "../../models/Figure.js";
import { Loop } from "../../models/Loop.js";
import { isSegment } from "../../models/segments/utils/isSegment.js";
import { jsonDiagram } from "./jsonDiagram.js";
import { jsonFigure } from "./jsonFigure.js";
import { jsonLoop } from "./jsonLoop.js";
import { jsonSegment } from "./jsonSegment.js";

type Shape = Loop | Figure | Diagram | Segment;

export function exportJSON(shape: Shape) {
  if (shape instanceof Diagram) {
    return jsonDiagram(shape);
  } else if (shape instanceof Figure) {
    return jsonFigure(shape);
  } else if (shape instanceof Loop) {
    return jsonLoop(shape);
  } else if (isSegment(shape)) {
    return jsonSegment(shape);
  } else {
    throw new Error("Unknown shape type");
  }
}
