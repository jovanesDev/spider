export default function ComplexArrayEditor({ name, value, onChange }) {
    const updateItem = (index, field, newVal) => {
      const updated = [...value];
      updated[index] = { ...updated[index], [field]: newVal };
      onChange(name, updated);
    };
  
    const removeItem = (index) => {
      const updated = value.filter((_, i) => i !== index);
      onChange(name, updated);
    };
  
    const addItem = () => {
      const newItem = {};
      if (value.length > 0) {
        Object.keys(value[0]).forEach((key) => {
          newItem[key] = "";
        });
      }
      onChange(name, [...value, newItem]);
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {value.map((obj, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: 10, borderRadius: 6 }}>
            <strong>Item {i + 1}</strong>
            {Object.entries(obj).map(([k, v]) => (
              <div key={k} style={{ marginBottom: 6 }}>
                <label>{k}</label>
                <input
                  value={v ?? ""}
                  onChange={(e) => updateItem(i, k, e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
            <button onClick={() => removeItem(i)}>❌ Eliminar</button>
          </div>
        ))}
        <button onClick={addItem}>➕ Agregar</button>
      </div>
    );
  }
  