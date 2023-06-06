import { Arc } from "../../models/segments/Arc.js";
import { EllipseArc } from "../../models/segments/EllipseArc.js";
import { Line } from "../../models/segments/Line.js";
import { Segment } from "../../models/segments/Segment.js";
import { RAD2DEG } from "../../vectorOperations.js";

export function svgSegmentToPath(segment: Segment) {
  if (segment instanceof Line) {
    return `L ${segment.lastPoint.join(" ")}`;
  }
  if (segment instanceof Arc) {
    return `A ${segment.radius} ${segment.radius} 0 ${
      segment.angularLength > Math.PI ? "1" : "0"
    } ${segment.clockwise ? "0" : "1"} ${segment.lastPoint.join(" ")}`;
  }
  if (segment instanceof EllipseArc) {
    return `A ${segment.majorRadius} ${segment.minorRadius} ${
      segment.tiltAngle * RAD2DEG
    } ${segment.deltaAngle > Math.PI ? "1" : "0"} ${
      segment.clockwise ? "0" : "1"
    } ${segment.lastPoint.join(" ")}`;
  }

  throw new Error("Unknown segment type");
}
