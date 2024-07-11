import { Link, useLocation } from "react-router-dom"
import logo from "./AluraTV.png"
import styles from "./Header.module.css"
import HeaderLink from "../HeaderLink/HeaderLink"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState("/");
  
    useEffect(() => {
      if (location.pathname === "/NuevoVideo") {
        setActiveButton("/NuevoVideo");
      } else {
        setActiveButton("/");
      }
    }, [location]);
  
    return (
      <header className={styles.header}>
        <Link to="/">
          <section className={styles.logocontainer}>
            <img src={logo} alt="Logo AluraTV" />
          </section>
        </Link>
  
        <nav className={styles.nav}>
          <HeaderLink url="/">
            <button
              className={`${styles.buttonHome} ${activeButton === "/" ? styles.activeButton : ""}`}
              onClick={() => setActiveButton("/")}
            >
              <FontAwesomeIcon icon={faHome} className={styles.faHomeIcon} />
              <span className={styles.buttonText}>Home</span>
            </button>
          </HeaderLink>
  
          <HeaderLink url="/NuevoVideo">
            <button
              className={`${styles.buttonNuevoVideo} ${activeButton === "/NuevoVideo" ? styles.activeButton : ""}`}
              onClick={() => setActiveButton("/NuevoVideo")}
            >
              <FontAwesomeIcon icon={faPlusCircle} className={styles.faPlusCircleIcon} />
              <span className={styles.buttonText}>Nuevo Video</span>
            </button>
          </HeaderLink>
        </nav>
      </header>
    );
  }
  
  export default Header;