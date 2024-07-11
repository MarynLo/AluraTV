import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useVideoContext } from "../../context/context";


function PaginaBase () {
    const location = useLocation()
    const { selectedVideo } = useVideoContext()

    return (
        
            <main>
                <Header />
                {(location.pathname === "/" && !selectedVideo) && <Banner />} 
                <Outlet />
                <Footer />
            </main>
    )
}

export default PaginaBase