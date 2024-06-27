import { Button, Position, Tooltip } from "@react-pdf-viewer/core";
import { FaWpexplorer } from "react-icons/fa6";

const ExplainToolTip = (props) => (
  <div
    style={{
      background: "#eee",
      display: "flex",
      position: "absolute",
      left: `${props.selectionRegion.left}%`,
      top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
      transform: "translate(0, 8px)",
      zIndex: 1,
    }}
  >
    <Tooltip
      position={Position.TopCenter}
      target={
        <Button onClick={props.toggle}>
          <FaWpexplorer />
        </Button>
      }
      content={() => <div style={{ width: "150px" }}>Explain this word</div>}
      offset={{ left: 0, top: -8 }}
    />
  </div>
);
export default ExplainToolTip;
