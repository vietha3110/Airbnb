import { useState } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import './UpdateSpot.css';
export function UpdateSpotForm(props) {
    const spot = props.spot;
    const modal = props.onClose;
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const id = spot.id
    //handle submit here
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setValidationErrors([]);
        
        dispatch(spotsActions.updateSpots({ id, name, description, price, address, country, city, state, lat, lng }))
            .then(() => modal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let error = Object.values(data.errors)
                setValidationErrors(error);
            }
        })
    }
    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
    }


    return (
        <div className='createspot-container'>
            <div className='createspot-welcome'>
                <h2>Update your place</h2>
            </div>
            <form onSubmit={handleSubmit} className='createspot-form'>
                {validationErrors.length > 0 && 
                    <ul>
                        {validationErrors.map(error => 
                            <li key={error}>{error}</li>)}
                    </ul>
                }
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder='Address'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder='City'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder='State'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder='Country'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='number'
                            step='any'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            placeholder='Latitude'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='number'
                            step='any'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            placeholder='Longitude'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Name your place'
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="field"
                        />
                    </label>
                </div>
                <div className="creatspot-fields">
                    <label>
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder='$Price'
                            className="field"
                        />
                    </label>
                </div>
                <button type='submit'>Agree & Submit</button>
                <button onClick={handleCancelButton}>Cancel</button>
            </form>
        </div>
    )

}
