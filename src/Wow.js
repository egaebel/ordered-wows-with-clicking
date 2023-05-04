function Wow(props) {
    const defaultWowValue = "Awaiting Wows";
    const currentWow = props.currentWow;

    console.log("Re-rendering OwenWilsonWow with currentWow: " + currentWow);

    let wowContent = "";
    if (currentWow !== defaultWowValue && currentWow !== undefined && currentWow !== "") {
        console.log("currentWow['video']: " + currentWow["video"]);
        console.log("currentWow['video']: " + currentWow.video);
        wowContent = (
            <div>
                Movie: {currentWow["movie"]} <br />
                Full line: {currentWow["full_line"]} <br />
                <audio controls preload="auto" src={currentWow["audio"]}></audio>  <br />
                <img src={currentWow["poster"]} alt="movie poster" style={{ maxHeight: "25%", maxWidth: "25%" }}></img>  <br />
                <div>
                    <video controls preload="auto" src={currentWow["video"]["1080p"]} height="1080px" width="1920px"></video>
                </div>
            </div>
        );
    }

    console.log("currentWow:\n" + JSON.stringify(currentWow));
    return (<div style={{ maxWidth: "100%" }}>
        <div>"Selected wow!"</div>
        {wowContent}
    </div >)
}

export default Wow;