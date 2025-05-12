import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import jwtEncode from "jwt-encode";
import Spinner from "../spinner/Spinner";
import "./style.css";


export default function JWTEditor({ name, value, onChange }) {
  const [decoded, setDecoded] = useState(null);
  const [tokenEditable, setTokenEditable] = useState(value);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
    }
  }, [spinner]);

  const handleDecode = () => {
    try {
      const data = jwtDecode(tokenEditable);
      setDecoded(data);
    } catch (err) {
      console.log(err);
      alert("Token inválido");
    }
  };

  const handleFieldChange = (key, val) => {
    setDecoded((prev) => ({ ...prev, [key]: val }));
  };

  const handleReencode = () => {
    try {
      const secret = "clave-fake"; // ⚠️ Solo para uso local
      const newToken = jwtEncode(decoded, secret);
      setTokenEditable(newToken);
      setDecoded(null)
      onChange(name, newToken);
      alert("Token actualizado");
      setSpinner(true)
    } catch (err) {
      console.log(err);
      alert("Error al codificar el token");
    }
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      {spinner && <Spinner/>}
      {!spinner && (
        <>
          <label htmlFor="">Token</label>
          <textarea
            rows={2}
            value={tokenEditable}
            readOnly
            onChange={(e) => setTokenEditable(e.target.value)}
            className="jwtTokenTextField"
          />
        </>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
        <button onClick={handleDecode} disabled={decoded}>
          🔍 Decodificar
        </button>
        {decoded && (
          <button onClick={handleReencode}>🔐 Guardar Cambios</button>
        )}
      </div>

      {decoded && (
        <div className="jwtFieldsContainer">
          {Object.entries(decoded).map(([k, v]) => (
            <div key={k} className="jwtField">
              <label className="truncate">{k}</label>
              <input
                value={v}
                onChange={(e) => handleFieldChange(k, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
