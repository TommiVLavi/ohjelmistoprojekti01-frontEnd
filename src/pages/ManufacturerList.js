import { useState, useEffect } from 'react';
import axios from 'axios';
import Piechart from '../components/Piechart';

export default function ManufacturerList() {
    const [manufacturerData, setManufacturerData] = useState([]);
    const [message, setMessage] = useState('Ladataan tietoja...');

    // get data from api and set data to state
    const getManufacturerData = async () => {
        try {
            const response = await axios.get('https://spring.omppujarane.store/api/manufacturers');
            setManufacturerData(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Tietojen haku ei onnistunut');
        }
    };
    useEffect(() => {
        getManufacturerData();
    }, []);

    // return table when data is loaded and there are no errors
    if (message.length > 0) return <p>{message}</p>

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nimi</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturerData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Piechart />
        </div>
    );
}