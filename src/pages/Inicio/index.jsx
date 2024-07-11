import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import styles from "./Inicio.module.css";
import { useVideoContext } from "../../context/context";


const colorPorDefecto = "#CCCCCC";

const categoriaColores = {
  "Front End": "#6BD1FF",
  "Back End": "#00C86F",
  "Innovación y Gestión": "#FFBA05",
};

const normalizeCategoria = (categoria) => categoria.toLowerCase();

const Inicio = () => {
  const { videos } = useVideoContext();
  console.log("Videos disponibles en inicio:", videos);

  const handleSelectedVideo = (video) => {
    console.log("Video seleccionado:", video);
    window.open(video.video,"__blank")
  };

 
  return (
    <div className={styles.inicioContainer}>
      {Object.keys(categoriaColores).map((categoriaNombre) => (
        <div key={categoriaNombre} className={styles.categoria}>
          <h2
            className={styles.nombre}
            style={{
              backgroundColor:
                categoriaColores[categoriaNombre] || colorPorDefecto,
            }}
          >
            {categoriaNombre}
          </h2>

          <div className={styles.video}>
            {videos
              .filter(
                (video) =>
                  normalizeCategoria(video.categoria) ===
                  normalizeCategoria(categoriaNombre)
              )
              .map((video) => (
                <Card
                  key={video.id}
                  video={video}
                  onSelect={() => handleSelectedVideo(video)}
                />
              ))}
          </div>
        </div>
      ))}
      <Modal />
    </div>
  );
};

export default Inicio;
