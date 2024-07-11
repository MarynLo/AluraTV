import styles from "./Footer.module.css"
import logo from "./AluraTV.png"
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer () {
    return (
        <footer className={styles.footerContainer}>
            <img className={styles.logo}  src={logo} alt="Logo de AluraTV"/>

            <div className={styles.links}>
                <li>
                    <a href="https://github.com/MarynLo" target="__blank">
                    <FaGithubSquare className={styles.icons} />
                    </a>
                </li>

                <li>
                    <a href="https://www.instagram.com/" target="__blank">
                    <FaInstagram className={styles.icons} />
                    </a>
                </li>
            </div>

            <div className={styles.textoContainer}>
                <p>Desarrollado por Marisol Negrete</p>
                <p>2024</p>
            </div>

        </footer>
    )
}

export default Footer