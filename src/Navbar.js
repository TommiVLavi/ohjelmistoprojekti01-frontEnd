import { Link, useMatch, useResolvedPath } from "react-router-dom"
import axios from 'axios';

export default function Navbar({hasRole, setHasRole}) {

    function logOut() {
        setHasRole('');
        sessionStorage.removeItem("jwt");
        delete axios.defaults.headers.common["Authorization"];
        window.location.replace('/');
    }

    return(
        <nav className="nav">
            <Link to="/" className="site-title">Etusivulle</Link>
            <ul>
                {hasRole === "ADMIN" ? <CustomLink to="/ProductForm">Lisää tuote</CustomLink> : null}
                <CustomLink to="/ProductList">Tuotelistaus</CustomLink>
                <CustomLink to="/ManufacturerList">Valmistajalistaus</CustomLink>
                <CustomLink to="/logout" onClick={logOut}>Kirjaudu ulos</CustomLink>
            </ul>
        </nav>
    )
}
//funktio tarkistaa millä sivulla ollaan ja korostaa sen navipalkissa
//lisätty myös toiminnallisuutta, ettei sivua ladata aina uudestaan, ainoastaan se osa mikä muuttuu ladataan.
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}