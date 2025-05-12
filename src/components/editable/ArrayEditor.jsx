export default function ArrayEditor({ name, value, onChange }) {
    const updateItem = (index, newValue) => {
      const updated = [...value];
      updated[index] = newValue;
      onChange(name, updated);
    };
  
    const removeItem = (index) => {
      const updated = value.filter((_, i) => i !== index);
      onChange(name, updated);
    };
  
    const addItem = () => {
      onChange(name, [...value, ""]);
    };
  
    return (
      <div style={{ marginBottom: '12px' }}>
        {value.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom:"10px" }}>
            <input
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
            />
            <button onClick={() => removeItem(i)}>❌</button>
          </div>
        ))}
        <button onClick={addItem}>➕ Agregar</button>
      </div>
    );
  }