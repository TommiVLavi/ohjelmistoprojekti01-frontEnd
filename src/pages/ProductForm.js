import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        type: '',
        price: '',
        manufacturer: 0,
    });

    const getManufacturerData = async () => {
        try {
            const response = await axios.get('https://spring.omppujarane.store/api/manufacturers');
            setManufacturers(response.data);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getManufacturerData();
    }, []);

    const handleChange = (e) => {
        setProductData(
            { ...productData, [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value }
            );
    }
    const emptyForm = () => {
        setProductData({
            name: '',
            type: '',
            price: '',
            manufacturer: 0,
        })
    }

    const handleSubmit = async () => {
        const formData = {
            name: productData.name,
            type: productData.type,
            price: productData.price,
            manufacturer: {
                id: parseInt(productData.manufacturer)
            }
        }
        try {
            await axios.post('https://spring.omppujarane.store/api/products/', formData)
                .then((response) => {
                    setProductData({
                        name: '',
                        type: '',
                        price: '',
                        manufacturer: 0,
                    })
                    alert('Tuote lisätty')
                }, (error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Lisää vaate</h1>
            <form>
                <label htmlFor="name">Anna Vaatteen nimi</label>
                <input type="text" id="name" name="name" value={productData.name} onChange={(e) => handleChange(e)} /><br />
                <label htmlFor="type">Anna Vaatteen tyyppi</label>
                <input type="text" id="type" name="type" value={productData.type} onChange={(e) => handleChange(e)} /><br />
                <label htmlFor="price">Anna Vaatteen hinta</label>
                <input type="number" id="price" name="price" value={productData.price} onChange={(e) => handleChange(e)} /><br />
                <label htmlFor="manufacturer">Valitse valmistaja</label>
                <select id="manufacturer" name="manufacturer" onChange={(e) => handleChange(e)} >
                    {manufacturers.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </form>
            <button type="submit" onClick={handleSubmit}>Lisää tuote</button><span>&nbsp;</span>
            <button type="submit" onClick={emptyForm}>Peruuta</button>
        </div>
    )
}