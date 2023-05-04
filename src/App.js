import './App.css';
import owenWilsonWow from "./owen-wilson-wow.avif"
import { useEffect, useState } from "react";
import Wow from './Wow';
import WowView from './WowView';


/*
 * Assignment:
 * 1. Make it so that when you click the text of the wow it displays that wow in the 
 * Wow box that is currently populated when you click "Get Wowed"
 * 2. Add prev/next buttons to move through the range of ordered wows.
 * 3. Stylize the table holding all the data
 * 4. Stylize the entire page with better colors
 */
function App() {

    const pageSize = 10;
    const [currentSelectedWow, setCurrentSelectedWow] = useState(undefined);
    const [currentWows, setCurrentWows] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(pageSize);

    let getOrderedWowsRange = async (startIndex, endIndex) => {
        console.log("Getting wows from range: %d - %d", startIndex, endIndex);
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        let url = `https://owen-wilson-wow-api.onrender.com/wows/ordered/${startIndex}-${endIndex}`
        let orderedWowsResponse = await fetch(url, options);
        console.log("orderedWowsResponse: " + Object.entries(orderedWowsResponse));
        let orderedWows = await orderedWowsResponse.json();
        console.log("Retrieved orderedWows: " + Object.entries(orderedWows));
        setCurrentWows(orderedWows);
    };

    const clearOnClick = () => {
        setCurrentSelectedWow(undefined);
    };

    const prevOnClick = () => {
        setStartIndex(Math.max(0, startIndex - pageSize));
        setEndIndex(Math.max(10, endIndex - pageSize));
    };

    const nextOnClick = () => {
        if (currentWows.length < pageSize) {
            console.log("End of wows.");
            return;
        }
        setStartIndex(startIndex + pageSize);
        setEndIndex(endIndex + pageSize);
    };

    useEffect(() => {
        getOrderedWowsRange(startIndex, endIndex);
    }, [startIndex, endIndex]);

    let imageDisplayed = (<div style={{ fontWeight: "bold" }}>
        <img src={owenWilsonWow} width="700px" alt="Owen Wilson himself"></img>
    </div>);
    if (currentSelectedWow !== undefined) {
        imageDisplayed = <Wow currentWow={currentSelectedWow}></Wow>;
    }

    return (
        <div className="App">
            <h1>Prepare to be WOW-ed</h1>
            <div style={{ justifyContent: "center", display: "flex" }}>
                <button onClick={clearOnClick}>Clear Wow</button>
            </div>
            {imageDisplayed}
            <div style={{ justifyContent: "center", display: "flex" }}>
                <button onClick={prevOnClick}>Prev</button>
                <button onClick={nextOnClick}>Next</button>
            </div>
            <div className="wowsTable">
                <table className="wowsTable">
                    <thead>
                        <tr>All the wows you could ever want</tr>
                        <tr><br /></tr>
                    </thead>
                    {currentWows.map(val => <WowView onClickFn={setCurrentSelectedWow} fullContent={val} />)}
                </table>
            </div>
        </div >
    );
}

export default App;
