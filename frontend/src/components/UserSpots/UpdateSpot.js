import { useEffect, useState } from "react";

export function UpdateSpotForm({spot}) {
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

    //handle submit here
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setValidationErrors([]);
        let createdSpot;
        try {
            createdSpot = await dispatch(spotsActions.updateSpot({ name, description, price, address, country, city, state, lat, lng}))
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
                <h3>Update your place</h3>
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
