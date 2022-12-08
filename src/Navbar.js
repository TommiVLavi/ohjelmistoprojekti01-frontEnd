import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar({hasRole}) {

    return(
        <nav className="nav">
            <Link to="/" className="site-title">Etusivulle</Link>
            <ul>
                {hasRole === "ADMIN" ? <CustomLink to="/ProductForm">Lisää tuote</CustomLink> : null}
                <CustomLink to="/ProductList">Tuotelistaus</CustomLink>
                <CustomLink to="/ManufacturerList">Valmistajalistaus</CustomLink>
                <CustomLink to="/Login">Kirjaudu sisään</CustomLink>
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