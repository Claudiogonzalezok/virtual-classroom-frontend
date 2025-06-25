import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // ✅

const UploadMaterialPage = () => {
  const [file, setFile] = useState(null);
  const { token } = useAuth(); // ✅

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Seleccioná un archivo");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Archivo subido correctamente");
    } catch (err) {
      console.error("Error al subir archivo:", err.response?.data || err.message);
      alert("Error al subir archivo");
    }
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
