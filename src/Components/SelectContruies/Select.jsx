import { useEffect, useState } from 'react';
import axios from 'axios';
import './select.css';

const Select = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [probablybith, setProbablybith] = useState(0);
    const totalPoblation=8231613070;
    let ct;

    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/population')
            .then(response => {
                const countryData = response.data.data.map(country => ({
                    name: country.country,
                    population: country.populationCounts[country.populationCounts.length - 1].value
                }));
                setCountries(countryData);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleButtonClick = () => {
        const selectedCountryData = countries.find(country => country.name === selectedCountry);
        if (selectedCountryData) {
            console.log(`Población de ${selectedCountry}: ${selectedCountryData.population}`);
            let prob=(selectedCountryData.population*100)/totalPoblation
            setProbablybith(prob.toFixed(2));   
            ct=selectedCountry;
        }
    };

    return (
        <>
        <div className='container'>
            <div className="selection-box">
                <select onChange={handleCountryChange} >
                {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </select>
            <button onClick={handleButtonClick}>Show me</button>
                
            </div>
            {selectedCountry && <p>Probability of birth in {ct}: {probablybith}%</p>}
        </div>
        </>
    );
};

export default Select;