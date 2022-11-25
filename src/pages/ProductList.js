import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap-buttons';

export default function ProductList() {
    const [productData, setProductData] = useState([]);
    const [message, setMessage] = useState('Ladataan tietoja...');

    // get data from api and set data to state
    const getProductData = async () => {
        try {
            const response = await axios.get('https://spring.omppujarane.store/api/products');
            setProductData(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Tuotteiden haku ei onnistunut');
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    // return table when data is loaded and there are no errors
    if (message.length > 0) return <p>{message}</p>

    // delete selected product
    const deleteProduct = async (id) => {
        console.log("Clicked delete item: " + id);
        try{
            const response = await axios.delete('https://spring.omppujarane.store/api/products/' + id);
            console.log('Tuote poistettu');
            setMessage('');
        }
        catch (error) {
            setMessage('Tuotteen poistaminen ei onnistunut');
        }

        getProductData();
    }

    const resetProductData = async () => {
        const prod1 = {
            "name": "Pipo2",
            "type": "Päähine",
            "price": 13,
            "manufacturer": {
                "id": 5
            }
        }
        const prod2 ={
            "name": "LämpöisäHaukku",
            "type": "talvihaalari",
            "price": 92,
            "manufacturer": {
            "id": 4
            }
        }
        const prod3 ={
            "name": "70-luku",
            "type": "Haalari",
            "price": 56,
            "manufacturer": {
                "id": 5
            }
        }
        
        console.log("lisää tuotteita");
        const response = await axios
        .post('https://spring.omppujarane.store/api/products/', prod1)
        .catch((error) => console.log('Error: ', error));
        if(response && response.data){
            console.log(response);
            console.log(response.data);
        }
        const response2 = await axios
        .post('https://spring.omppujarane.store/api/products/', prod2)
        .catch((error) => console.log('Error: ', error));
        if(response2 && response2.data){
            console.log(response2);
            console.log(response2.data);
        }
        const response3 = await axios
        .post('https://spring.omppujarane.store/api/products/', prod3)
        .catch((error) => console.log('Error: ', error));
        if(response3 && response3.data){
            console.log(response3);
            console.log(response3.data);
        }
        getProductData();
    }

    return (
        <div>
            <table class="table table-bordered table-striped table-hover">
                <thead class="thead thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nimi</th>
                        <th>Hinta</th>
                        <th>Valmistaja</th>
                        <th>Poista tuote</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.manufacturer.name}</td>
                            <td><Button onClick={() => deleteProduct(item.id)}>X</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button onClick={() => resetProductData()}>Reset</Button>
        </div>
    );
}