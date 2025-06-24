import { useEffect, useState } from "react";

const ViewMaterialsPage = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Simulación de fetch
    setMaterials([
      { name: "Clase 1 - PDF", url: "/files/clase1.pdf" },
      { name: "Clase 2 - Video", url: "/files/clase2.mp4" },
    ]);
    // En la práctica: axios.get("/api/materials") y luego setMaterials(res.data)
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Materiales Disponibles</h2>
      <ul>
        {materials.map((file, i) => (
          <li key={i}>
            <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMaterialsPage;
