import { useEffect, useState, useRef } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";
 

function App() {
  // Referencias para los editores
  const [activeTab, setActiveTab] = useState("facil");
  const [editorContent, setEditorContent] = useState({
    facil: "",
    medio: "",
    dificil: "",
  });
  

  const editorRef = useRef(null);
  const consolaRef = useRef(null);

  // Función para manejar el montaje de los editores
  function handleEditorDidMount(editor, id) {
    if (id === "facil") {
      editorRef.current = editor;
    } else if (id === "consola") {
      consolaRef.current = editor;
    }
  }


  // Función para enviar la solicitud de graficar
  function graficar() {
    fetch("http://localhost:4000/graficar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        document.getElementById('graphImage').src = url;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Función para interpretar el código
  function interpretar() {
    const entrada = editorContent[activeTab];
    fetch("http://localhost:4000/analizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Entrada: entrada }),
    })
      .then((response) => response.json())
      .then((data) => {
        consolaRef.current.setValue(data.consola);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Función para cargar un archivo
  const cargarArchivo = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const contents = event.target.result;
      setEditorContent((prevContent) => ({
        ...prevContent,
        [activeTab]: contents,
      }));
    };
    reader.readAsText(file);
  };

  // Función para generar el reporte AST
 
function generarReporteAST() {
  // Lógica para generar el reporte AST
  console.log("Generando reporte AST...");
  // Abrir la imagen "reporte"
  window.open('./reporteAST.html', '_blank');
}

function abrirReporteErrores() {
  window.open('http://localhost:4000/errores', '_blank');
}


function abrirReporteTokens() {
  window.open('http://localhost:4000/tabla_simbolos', '_blank');
}


  return (
    <div className="App">
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CompiScript+
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <input
                  type="file"
                  id="file"
                  className="form-control form-control-sm visually-hidden"
                  onChange={cargarArchivo}
                />
                <label
                  htmlFor="file"
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="bi bi-upload me-1"></i> Cargar Archivo
                </label>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-2">
                {" "}
                {/* Agregado la clase me-2 aquí */}
                <a
                  className="nav-link btn btn-sm btn-outline-light"
                   
                  onClick={abrirReporteErrores}
                >
                  Errores
                </a>
              </li>
              <li className="nav-item me-2">
                {" "}
                {/* Agregado la clase me-2 aquí */}
                <a
                  className="nav-link btn btn-sm btn-outline-light"
                  onClick={abrirReporteTokens}
                >
                  Tabla de Símbolos
                </a>
              </li>
              <li className="nav-item me-2">
                {" "}
                {/* Agregado la clase me-2 aquí */}
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    interpretar();
                    graficar();
                  }}
                >
                  <i className="bi bi-play-circle me-1"></i> Interpretar
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={generarReporteAST}
                >
                  <i className="bi bi-file-earmark-text me-1"></i> Reporte AST
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Contenido Principal */}
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            {/* Pestañas de editor */}
            <ul className="nav nav-tabs" id="editorTabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "facil" && "active"}`}
                  onClick={() => setActiveTab("facil")}
                >
                  Facil
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "medio" && "active"}`}
                  onClick={() => setActiveTab("medio")}
                >
                  Medio
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "dificil" && "active"}`}
                  onClick={() => setActiveTab("dificil")}
                >
                  Dificil
                </a>
              </li>
            </ul>
            {/* Editor actual según la pestaña activa */}
        
            <Editor
              height="90vh"
              defaultLanguage="java"
              value={editorContent[activeTab]}
              theme="vs-dark"
              onMount={(editor) => handleEditorDidMount(editor, activeTab)}
              onChange={(value) =>
                setEditorContent((prevContent) => ({
                  ...prevContent,
                  [activeTab]: value,
                }))
              }
              options={{ fontFamily: "JetBrains Mono", lineNumbers: "on" }}
            />
          </div>
          <div className="col">
            {/* Consola */}
            <div className="editor-header">Consola</div>
            <Editor
              height="90vh"
              defaultLanguage="cpp"
              value={consolaRef.current && consolaRef.current.getValue()}
              theme="vs-dark"
              options={{
                readOnly: true,
                fontFamily: "JetBrains Mono",
                lineNumbers: "on",
              }}
              onMount={(editor) => handleEditorDidMount(editor, "consola")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;