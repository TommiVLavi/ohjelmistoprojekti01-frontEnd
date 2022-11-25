import { useState, useEffect } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <table class="table table-bordered table-striped table-hover">
                <thead class="thead thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nimi</th>
                        <th>Hinta</th>
                        <th>Valmistaja</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.manufacturer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}