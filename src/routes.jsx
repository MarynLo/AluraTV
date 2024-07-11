import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { VideoProvider } from "./context/context"
import PaginaBase from "./pages/PaginaBase"
import NuevoVideo from "./pages/NuevoVideo"
import Inicio from "./pages/Inicio"

function AppRoutes() {
    return (
        <VideoProvider> 
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaBase />}>
                    <Route index element={<Inicio />} />
                    <Route path="NuevoVideo" element={<NuevoVideo />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </VideoProvider>
        
    )
}

export default AppRoutes