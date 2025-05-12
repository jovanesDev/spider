export default function EditableField({ name, value, handleChange, type = "text",readOnly=false }) {
    return (
      <div style={{ marginBottom: '8px' }}>
        <textarea
          readOnly={readOnly}
          type={type}
          value={value}
          style={{width:"100%",resize:"vertical"}}
          onChange={(e) =>
            handleChange(name, e.target.value)
          }
        />
      </div>
    );
  }