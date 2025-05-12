import { useState } from "react";
import "./style.css"

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="container"
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: "#f0f0f0",
          padding: "8px 12px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <span className="arrow">{open ? "▼" : "▶"}</span>
        {title}
      </div>
      {open && <div style={{ padding: "10px" }}>{children}</div>}
    </div>
  );
}
