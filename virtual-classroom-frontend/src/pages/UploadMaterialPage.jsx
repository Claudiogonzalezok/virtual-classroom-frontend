import { useState } from "react";

const UploadMaterialPage = () => {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Seleccioná un archivo");

    // Lógica para subir el archivo
    const formData = new FormData();
    formData.append("file", file);

    // Enviar al backend (axios/fetch)
    console.log("Archivo preparado para subir:", file.name);
    // Aquí podés agregar la llamada con axios al backend
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Subir Material</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
};

export default UploadMaterialPage;
