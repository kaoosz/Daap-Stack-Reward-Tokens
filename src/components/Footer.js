import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import '../App.css';


function Footer(){
    return(
        <footer>
            <ul className="social_list">
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <a rel="noopener noreferrer" href="https://github.com/kaoosz" target="_blank"> <FaGithub /> </a>
                </li>
            </ul>
        </footer>
    ) // <a rel="noopener noreferrer" href="http://url.com" target="_blank">Link Here</a>
}

export default Footer

