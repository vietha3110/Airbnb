import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return (
        <div className='managespot-welcome'> 
            <h2>Please login to see this page!</h2>
        </div>
 
    )
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setValidationErrors([]);
        if (url.length > 256) setValidationErrors(['The length of URL must less than 256 characters'])
         
        // let createdSpot;
        // try {
        //     createdSpot = await dispatch(spotsActions.createSpot({ name, description, price, address, country, city, state, lat, lng, url, preview }))
        // } catch {
        //     (e = async (res) => {
        //         const data = await res.json();
        //         console.log(`*************`, data)
        //         if (data && data.error) {
        //             console.log(`here`)
        //             let error = Object.values(data.errors)
        //             setValidationErrors(error);
        //         }
        //     })
        // }
        let createdSpot = await dispatch(spotsActions.createSpot({ name, description, price, address, country, city, state, lat, lng, url, preview }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.message) {
                    if (data.errors) {
                        const errors = Object.values(data.errors);
                        setValidationErrors(errors);
                    } else {
                        setValidationErrors(data.message);
                    }   
                }
        })
           
        if (createdSpot) {
            const id = createdSpot.id
            history.push(`/spots/${id}`)
        }

    }

    return (
        <div className='createspot-container'>
            <div className='createspot-welcome'>
                    <h2>Host your place</h2>
            </div>
            <form onSubmit={handleSubmit} className='createspot-form'>
                {validationErrors.length > 0 && 
                    <ul>
                        {validationErrors.map(error => 
                            <li key={error}>{error}</li>)}
                    </ul>
                }
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder='Address'
                            className='input-field'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder='City'
                            className='input-field'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='text'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder='State'
                            className='input-field'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='text'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder='Country'
                            className='input-field'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='number'
                            step='any'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            placeholder='Latitude'
                            className='input-field'
                            required
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='number'
                            step='any'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            placeholder='Longitude'
                            className='input-field'
                            required
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder='Name your place'
                            className='input-field'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className='input-field'
                            placeholder='Description: Describe the decor, light, location, etc...'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder='$Price'
                            className='input-field'
                            min='1'
                        />
                    </label>
                </div>
                <div className='creatspot-field'>
                    <label>
                        <input
                            type='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            placeholder='Image Link'
                            className='input-field'
                    />
                    </label>
                </div>
                <button type='submit'>Agree & Submit</button>
            </form>
        </div>
    )
}
