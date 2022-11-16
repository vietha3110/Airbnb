import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import './CreateSpotForm.css';


export function CreateSpotForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [url, setUrl] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const preview = true;
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setValidationErrors([]);
         
        let createdSpot;
        try {
            createdSpot = await dispatch(spotsActions.createSpot({ name, description, price, address, country, city, state, lat, lng, url, preview }))
        } catch {
            (e = async (res) => {
                const data = await res.json();
                if (data && data.error) {
                    setValidationErrors([data.error]);
                }
            })
        }
           
        if (createdSpot) {
            const id = createdSpot.id
            history.push(`/spots/${id}`)
        }

    }

    return (
        <div>
            <div>
                <h3>Host your place</h3>
            </div>
            <form onSubmit={handleSubmit}>
                {validationErrors.length > 0 && 
                    <ul>
                        {validationErrors.map(error => 
                            <li key={error}>{error}</li>)}
                    </ul>
                }
                <label>
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder='Address'
                    />
                </label>
                <label>
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder='City'
                    />
                </label>
                <label>
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder='State'
                    />
                </label>
                <label>
                    <input
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder='Country'
                    />
                </label>
                <label>
                    <input
                        type='number'
                        step='any'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder='Latitude'
                    />
                </label>
                <label>
                    <input
                        type='number'
                        step='any'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder='Longitude'
                    />
                </label>
                <label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Name your place'
                    />
                </label>
                <label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder='$Price'
                    />
                </label>
                <label>
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        placeholder='Image Link'
                />
                </label>
                <button type='submit'>Agree & Submit</button>
            </form>
        </div>
    )
}
