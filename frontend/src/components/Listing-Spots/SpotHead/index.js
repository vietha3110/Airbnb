import treehouse from "../img/treehouse.jpeg";
import omg from "../img/Omg.jpeg";
import beachfront from "../img/beachfront.jpeg";
import lakehouse from "../img/lakehouse.jpeg";
import amazingview from "../img/amazingview.jpeg";
import design from "../img/design.jpeg";
import cabin from "../img/cabin.jpeg";
import mansions from "../img/mansions.jpeg";
import trending from "../img/trending.jpeg";
import "./index.css";
import FilterModal from "./Filter";
import tiny from "../img/tiny.jpeg";
import LabelledButton from "../../LabelledButton";


const SpotHead = ({dispatch}) => {
    return (
        <>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={lakehouse} className="spothead-img"></img>
                    <span>Lakefront</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={treehouse}></img>
                    <span>Treehouses</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={design}></img>
                    <span>Design</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={mansions}></img>
                    <span>Mansions</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={cabin}></img>
                    <span>Cabins</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={amazingview}></img>
                    <span>Amazing</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={omg}></img>
                    <span>OMG</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={beachfront}></img>
                    <span>Beachfront</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={trending}></img>
                    <span>Trending</span>
                </div>
            } />
            <LabelledButton child={
                <div className="spothead-icon">
                    <img className="spothead-img" src={tiny}></img>
                    <span>Tiny</span>
                </div>
            }/>
            
            <div className="spothead-icon filter-box">
                <FilterModal dispatch={dispatch} />
            </div>
        </>
    )
}

export default SpotHead;
