import { useState, useEffect } from 'react';
import { Chart } from "react-google-charts"; // Instructions: https://www.react-google-charts.com/ 
import axios from 'axios';

export default function Piechart() {
    const [productData, setProductData] = useState([]);
    const [message, setMessage] = useState('Ladataan tietoja...');

    // get data from api and set data to state
    const getProductData = async () => {
        try {
            const response = await axios.get('https://spring.omppujarane.store/api/products');
            setProductData(response.data);
            setMessage('');
        } catch (error) {
            setMessage('Tietojen haku ei onnistunut');
        }
    };
    useEffect(() => {
        getProductData();
    }, []);

    // get manufacturer data from each product
    const manufacturers = productData.map((item) => item.manufacturer);
    
    // count how many times each manufacturer appears in the array
    const counts = {};
    for (let i = 0; i < manufacturers.length; i++) {
        if (counts[manufacturers[i].name]) {
            counts[manufacturers[i].name] += 1;
        } else {
            counts[manufacturers[i].name] = 1;
        }
    }

    // create array of arrays for google charts from counts
    const chartData = [
        ['Valmistaja', 'Määrä'],
    ];
    for (let key in counts) {
        chartData.push([key, counts[key]]);
    }

    // chart options
    const options = {
        title: "Valmistajien osuudet vaatteista",
        pieSliceText: "label"
    }

    // return chart when data is loaded and there are no errors
    if (message.length > 0) return <p>{message}</p>

    return (
            <Chart
                chartType="PieChart"
                data={chartData}
                options={options}
                width={"100%"}
                height={"400px"}
            />
    );
}
