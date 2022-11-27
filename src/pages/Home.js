import {
    Link,
    useMatch,
    useResolvedPath
} from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';




export default function Home() {
    //Landingpage
    return (
        <div>
            <h1>Ompun ja Ranen Koiravaatekauppa</h1>
            <div>
                <img className="image img-fluid rounded" src="https://images.pexels.com/photos/9649638/pexels-photo-9649638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                id="home-img-one" alt="Shih Tzu Wearing Sweater" />
                <img className="image img-fluid rounded" src="https://images.pexels.com/photos/9649661/pexels-photo-9649661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                id="home-img-two" alt="Shih Tzu in striped shirt"  />
            </div>
            < br/>
            <div>
                
                < Link to = "/ProductList" >
                    <Button outline btnStyle="dark"> Tuotelistaukseen </Button></Link>
            </div>
            
        </div>
    )
    

        
}