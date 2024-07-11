import React from "react"
import { VideoProvider } from "./context/context"
import PaginaBase from "./pages/PaginaBase"
import NuevoVideo from "./pages/NuevoVideo"
import Inicio from "./pages/Inicio"
import { BrowserRouter, Route, Routes } from "react-router-dom"

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