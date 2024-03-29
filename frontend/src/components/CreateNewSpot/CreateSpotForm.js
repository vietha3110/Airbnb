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
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    const lat = 47.823;
    const lng = 123;
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
        <div className='createspot-main'>
            <div className='createspot-video'>
                <div className='createspot-welcome'>
                    <h1>It’s easy to start on Haairbnb</h1>
                </div>
                <div className='createspot-youtube'>
                    <iframe width="480" height="720" src="https://www.youtube.com/embed/KqWUMVLJLLo?autoplay=1&rel=0" title="Introducing Airbnb Plus | Airbnb" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
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
                                className='input-fieldSpot'
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
                                className='input-fieldSpot'
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
                                className='input-fieldSpot'
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
                                className='input-fieldSpot'
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
                                className='input-fieldSpot'
                            />
                        </label>
                    </div>
                    <div className='creatspot-field'>
                        <label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className='input-fieldSpot'
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
                                className='input-fieldSpot'
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
                                className='input-fieldSpot'
                        />
                        </label>
                    </div>
                    <button type='submit'>Agree & Submit</button>
                </form>
            </div>
        </div>
    )
}
