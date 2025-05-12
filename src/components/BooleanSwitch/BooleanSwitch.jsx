import "./style.css"

export default function BooleanSwitch({ name, value, onChange }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <label>{name}</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(name, e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
    );
  }
  