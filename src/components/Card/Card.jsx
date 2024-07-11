import React from "react";
import styles from "./Card.module.css";
import borrar from "./eliminar.png";
import editar from "./editar.png";
import { useVideoContext } from "../../context/context";

const Card = ({ video, onSelect }) => {
  console.log('Renderizando video en Card:', video);
  const { handleDeleteVideo, openModal } = useVideoContext();

  const handleDelete = async (e) => {
    e.stopPropagation(); // Evitar que se propague el evento de clic
    try {
      await handleDeleteVideo(video.id);
    } catch (error) {
      console.error("Error al eliminar video:", error);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openModal(video);
  };


  return (
    <div className={`${styles.cardContainer} ${styles[video.categoria.replace(/\s+/g, '').toLowerCase()]}`} onClick={onSelect}>
      <img
        className={styles.imgVideo}
        src={video.foto}
        alt={video.titulo}
      />
      <div className={styles.infoContainer}>
        <div className={styles.button}>
          <button className={styles.buttonBorrar} onClick={handleDelete}>
            <img src={borrar} alt="Borrar" />
            <h3 className={styles.tituloButton}>Borrar</h3>
          </button>
          <button className={styles.buttonEditar} onClick={handleEdit}>
            <img src={editar} alt="Editar" />
            <h3 className={styles.tituloButton}>Editar</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;