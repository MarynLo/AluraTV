import axios from "axios"
import Card from "../../components/Card"
import React, { useEffect, useState } from "react"

const Categorias = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get("http://localhost:3001/videos")
                setVideos(response.data)
            } catch (error) {
                console.error("Error fetching videos:" , error)
            }
        }

        fetchVideos()
    }, [])

    return (
        <div className="categorias-page">
            <h1>Categorias</h1>
            <div className="videos">
                {videos.map((video) => (
                <Card key={video.id} video={video} />
                ))}

            </div>
        </div>
    )
}


export default Categorias