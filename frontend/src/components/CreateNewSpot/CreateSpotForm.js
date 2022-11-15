import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import './CreateSpotForm.css';


export function CreateSpotForm() {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots);
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

    // if (spot) {
    //     // const id = spot.id?
    //     return (
    //         <Redirect to='/' />
    //     )
    // }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setValidationErrors([]);
        return dispatch(spotsActions.createSpot({ name, description, price, address, country, city, state, lat, lng, url, preview }))
            .then(async (res) => {
                const data = res.json();
                console.log(data);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.error) {
                    console.log(`something's wrong here please check your backend`, data)
                    setValidationErrors([`error`]);
                }
            })
        // const data = await response.json();
        // if (data && data.id) {
        //     return (
        //         <Redirect to={`/spots/${data.id}`}/>
        //     )
        // } else {
        //     const error = data.error;
        //     setValidationErrors([error]);
        // }
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
