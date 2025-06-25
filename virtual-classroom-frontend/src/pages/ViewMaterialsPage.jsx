import { useEffect, useState } from "react";
import axios from "axios";

const ViewMaterialsPage = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/materials"); // Ajustá el puerto si es necesario
        setMaterials(res.data);
      } catch (err) {
        console.error("Error al obtener materiales:", err);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Materiales Disponibles</h2>
      {materials.length === 0 ? (
        <p>No hay materiales disponibles.</p>
      ) : (
        <ul>
          {materials.map((file, i) => (
            <li key={i}>
              <a
                href={`http://localhost:5000${file.url}`}
                target="_blank"
                rel="noreferrer"
              >
                {file.originalname}
              </a>{" "}
              <small>(subido por {file.uploadedBy?.name || "desconocido"})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewMaterialsPage;
