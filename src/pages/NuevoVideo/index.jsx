import styles from "./NuevoVideo.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useVideoContext } from "../../context/context";
import React, { useEffect, useState } from "react";

const NuevoVideo = () => {
  const { handleAddVideo, fetchVideos } = useVideoContext();
  const navigate = useNavigate();
  const initialVideoState = {
    titulo: "",
    video: "",
    foto: "",
    categoria: "",
    descripcion: "",
  };

  const [newVideo, setNewVideo] = useState(initialVideoState);
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/videos"
        );

        const uniqueCategorias = [
          ...new Set(response.data.map((video) => video.categoria)),
        ];
        setCategorias(uniqueCategorias);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }))
  };

  const validate = () => {
    let tempErrors = {};
    if(!newVideo.titulo) tempErrors.titulo ="El título es obligatorio";
    if(!newVideo.foto) tempErrors.foto ="URL de la imagen es obligatorio"
    if(!newVideo.descripcion) tempErrors.descripcion = "La descripción es obligatoria"
    if(!newVideo.categoria) tempErrors.categoria = "La categoría es obligatoria"
    if(!newVideo.video) tempErrors.video = "URL del video obligatorio"
    return tempErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate()
    if(Object.keys(validationErrors).length === 0) {
    try {
      await handleAddVideo(newVideo);
      setNewVideo(initialVideoState);
      await fetchVideos(); 
      navigate("/"); 
    } catch (error) {
      console.error("Error adding video:", error);
    }
  } else {
    setErrors(validationErrors)
  }
}

  return (
    <div className={styles.nuevoVideoContainer}>
      <div className={styles.cabeceraFormulario}>
        <h2 className={styles.tituloCabecera}>NUEVO VIDEO</h2>
        <p className={styles.parrafoCabecera}>
          Completa el formulario para agregar un nuevo video.
        </p>
      </div>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.sectionFormulario}>
          <div className={styles.formIzquierdo}>

            <div className={styles.campo}>
              <label className={styles.label}>
                Título:
                <input
                  type="text"
                  name="titulo"
                  value={newVideo.titulo}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.titulo ? styles.inputError : ''}`}
                  placeholder="Ingrese el título"
                />
                {errors.titulo && <div className={styles.error}>{errors.titulo}</div>}
              </label>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>
                Imagen:
                <input
                  type="text"
                  name="foto"
                  value={newVideo.foto}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.foto ? styles.inputError : ''}`}
                  placeholder="URL de la imagen"
                />
                  {errors.foto && <div className={styles.error}>{errors.foto}</div>}
              </label>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>
                Descripción:
                <textarea
                  name="descripcion"
                  value={newVideo.descripcion}
                  onChange={handleChange}
                  className={`${styles.textarea} ${errors.descripcion ? styles.inputError : ''}`}
                  placeholder="¿De qué se trata el video?"
                />
                  {errors.descripcion && <div className={styles.error}>{errors.descripcion}</div>}
              </label>
            </div>
          </div>

          <div className={styles.formDerecho}>
            <div className={styles.campo}>

              <label className={styles.label}>
                Categoría:
                <select
                  name="categoria"
                  value={newVideo.categoria}
                  onChange={handleChange}
                  className={`${styles.select} ${errors.categoria ? styles.inputError : ''}`}
                >
                  <option value="" disabled>
                    Seleccione la categoría
                  </option>
                  {categorias.map((cat) => (
                    <option
                      className={styles.listNuevoVideo}
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.categoria && <div className={styles.error}>{errors.categoria}</div>}
              </label>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>
                Video:
                <input
                  type="text"
                  name="video"
                  value={newVideo.video}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.video ? styles.inputError : ''}`}
                  placeholder="URL del video"
                />
                  {errors.video && <div className={styles.error}>{errors.video}</div>}
              </label>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.buttonGuardar}>
            Guardar
          </button>

          <button
            type="button"
            className={styles.buttonLimpiar}
            onClick={() => setNewVideo(initialVideoState)}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoVideo;
