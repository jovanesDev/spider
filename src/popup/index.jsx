/* global chrome */

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Accordion from "../components/accordion";
import EditableField from "../components/editable/EditableField";
import ArrayEditor from "../components/editable/ArrayEditor";
import JWTEditor from "../components/editable/JwtEditor";
import Spinner from "../components/spinner/Spinner";
import BooleanSwitch from "../components/BooleanSwitch/BooleanSwitch";
import ComplexArrayEditor from "../components/editable/ComplexArrayEditor";
import { toast } from "react-hot-toast";


const Popup = () => {
  const [session, setSession] = useState({});
  const [noSession, setNoSession] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   getLocalStorage()
   
  }, []);

  useEffect(() => {
    if(loading){
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  }, [loading])
  

  const getLocalStorage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            try {
              return localStorage.getItem("session");
            } catch (err) {
              console.log(err)
              return null;
            }
          }
        },
        (results) => {
          if (chrome.runtime.lastError) {
            toast.error("⚠️ Error de ejecución: " + chrome.runtime.lastError.message);
            return;
          }
  
          const raw = results?.[0]?.result;
          if (!raw) {
            toast.error("No se encontró session en el tab activo");
            return;
          }
  
          try {
            const parsed = JSON.parse(raw);
            setSession(parsed);
            console.log(parsed)
            setLoading(false)
            setNoSession(false)
            toast.success("✔️ Se cargo correctamente");
          } catch (err) {
            console.log(err)
            toast.error("❌ Error al parsear session");
          }
        }
      );
    });
  };
  
  

  // ✅ Esta función maneja claves anidadas como "authenticationSSO.accessToken"
  const handleFieldChange = (compositeKey, newVal) => {
    setSession((prev) => {
      const keys = compositeKey.split(".");
      const newSession = { ...prev };
      let current = newSession;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        current[k] = { ...current[k] };
        current = current[k];
      }

      current[keys.at(-1)] = newVal;
      return newSession;
    });
  };

  const handleSave = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: (data) => {
            try {
              localStorage.setItem("session", JSON.stringify(data));
              return true;
            } catch {
              return false;
            }
          },
          args: [session]
        },
        (results) => {
          if (chrome.runtime.lastError) {
            toast.error("⚠️ Error al guardar: " + chrome.runtime.lastError.message);
            return;
          }
  
          if (results?.[0]?.result === true) {
            toast.success("💾 Guardado correctamente en el tab activo");
          } else {
            toast.error("❌ Falló al guardar en el tab");
          }
        }
      );
    });
  };
  
  

  // ✅ Lógica para decidir qué editor usar según el tipo de dato
  const renderEditorByType = (key, value) => {
    if (typeof value === "string" && key.toLowerCase().includes("token")) {
      return (
        <JWTEditor
          key={key}
          name={key}
          value={value}
          onChange={handleFieldChange}
        />
      );
    }

    if (typeof value === "boolean") {
      return (
        <BooleanSwitch
          key={key}
          name={key}
          value={value}
          onChange={handleFieldChange}
        />
      );
    }

    if (Array.isArray(value)) {
      const isArrayOfObjects = value.length > 0 && typeof value[0] === "object";
    
      if (!isArrayOfObjects) {
        return (
          <ArrayEditor
            key={key}
            name={key}
            value={value}
            onChange={handleFieldChange}
          />
        );
      } else {
        return (
          <ComplexArrayEditor
            key={key}
            name={key}
            value={value}
            onChange={handleFieldChange}
          />
        );
      }
    }
    

    if (typeof value === "object" && value !== null) {
      return Object.entries(value).map(([subKey, subVal]) => (
        <Accordion key={subKey} title={subKey}>
          {renderEditorByType(`${key}.${subKey}`, subVal)}
        </Accordion>
      ));
    }

    return (
      <EditableField
        key={key}
        name={key}
        value={value ?? ""}
        handleChange={handleFieldChange}
      />
    );
  };

  if (loading) {
    return (
      <>
        <Navbar isDisabled={loading} refresh={getLocalStorage} />
        <Spinner />
      </>
    );
  }

  if (noSession && !loading) {
    return (
      <>
        <Navbar refresh={getLocalStorage} />
        <div className="popupContainer">
          <h4>No se encontro el session</h4>
        </div>
      </>
    );
  }

  return (
    <div className="popupContainer">
      <Navbar refresh={getLocalStorage} />

      {Object.entries(session).map(([key, val]) => (
        <Accordion key={key} title={key}>
          {renderEditorByType(key, val)}
        </Accordion>
      ))}

      <button className="saveButton" onClick={handleSave}>💾 Guardar</button>
    </div>
  );
};

export default Popup;
