import { useState } from "react";
import "./index.css";


const SearchBox = () => {
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(1);

    
    return (
        <>  
            <div className="search-input-title">
                <i className="fa-solid fa-xmark"></i>
                <div className="search-input-title-span"><span>Filters</span></div>
            </div>
            <div className="search-input-content">
                <span>Price range</span>
                <div className="search-input-price">
                    <div className="search-input-min">
                        <label>Min Price</label>
                        <input type="number" required min="1" max="200" onChange={e => setMinPrice(e.target.value)}/>
                    </div>
                    <div className="search-input-max">
                        <label>Max Price</label>
                        <input type="number" required min="1" max="1000" onChange={e => setMaxPrice(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="search-input-btn">
                <button className="search-input-btnfilter">
                    <i className="fa-solid fa-filter"></i>
                    <span>
                        Show Places
                    </span>
                </button>
            </div>
        </>
        
    )
}

export default SearchBox
