import { useState } from 'react';
import { useDispatch } from 'react-redux';


export default function NewSpotForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    

    //const handleSubmit? 

    return (
        <div>
            <div>
                <h3>Host your place</h3>
            </div>
            <form>
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
                    />
                </label>
            </form>
        </div>
    )
}
