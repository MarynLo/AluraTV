import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/videos"
      );
      console.log("Videos cargados:", response.data); 
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleAddVideo = async (newVideo) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/videos", newVideo);
      console.log("Nuevo video agregado:", response.data);

      setVideos((prevVideos) => [...prevVideos, response.data]);
      await fetchVideos()
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(
        `http://localhost:3001/videos/${videoId}`
      );
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video.id !== videoId)
      );
    } catch (error) {
      console.error("Error eliminando video:", error);
    }
  };

  const handleSaveVideo = async (editedVideo) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/videos/${editedVideo.id}`, editedVideo
      );
      console.log("Video actualizado:", response.data);

      setVideos((prevVideos) => prevVideos.map((video) => video.id === editedVideo.id ? editedVideo : video)) 
           
      closeModal();
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const handleSelectVideo = (video) => {
    setSelectedVideo(video)
  }

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const videoContextValue = {
    videos,
    fetchVideos,
    handleAddVideo,
    handleDeleteVideo,
    handleSaveVideo,
    handleSelectVideo,
    isModalOpen,
    openModal,
    closeModal,
    selectedVideo,
  };

  return (
    <VideoContext.Provider value={videoContextValue}>
      {children}
    </VideoContext.Provider>
  );
};

export {VideoProvider}