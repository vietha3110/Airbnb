import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as spotAction from "../../../store/spots";


const SearchBox = ({onClose}) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [err, setErr] = useState("");
    const dispatch = useDispatch; 
    const history = useHistory();
    const closeBox = () => {
        onClose();
    }

    const filter = () => {
        setErr("");
        if (!minPrice || !maxPrice) {
            setErr("please input min price or max price.");
        } else if (Number(minPrice) === 0) {
            setErr("min price must start from $1");
        } else if (+minPrice >= +maxPrice) {
            setErr("min price must be less than max price.");
        } else {
            dispatch(spotAction.filterSpots({ minPrice, maxPrice }))
                .then(() => {
                    onClose();
                    history.push("/filtered-spots");
                }).catch(async (err) => {
                    setErr(err);
                })
        }
    }
    
    return (
        <>  
            <div className="search-input-title">
                <i className="fa-solid fa-xmark" onClick={closeBox}></i>
                <div className="search-input-title-span"><span>Filters</span></div>
            </div>
            <div className="search-input-content">
                <span>Price range</span>
                <div className="search-input-err">
                    {
                        err && 
                        <span>
                                {err}
                        </span>
                    }
                </div>
                <div className="search-input-price">
                    <div className="search-input-min">
                        <label>Min Price</label>
                        <input
                            type='number'
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className="search-input-max">
                        <label>Max Price</label>
                        <input
                             type='number'
                             value={maxPrice}
                             onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="search-input-btn">
                <button className="search-input-btnfilter" onClick={filter} >
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
