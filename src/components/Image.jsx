import React, {useState, useEffect} from "react";
import "./Image.css";

const Image = () =>{

    const[inputValue, setInputValue] = useState("");

    const[data, setData] = useState([]);

    const[visible, setVisible] = useState(4);

    console.log(visible);

    const handleChange = (event) =>{
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    const handleClick = () =>{
        setVisible(prevState => prevState + 4);
    }

    const FetchData = () =>{
        useEffect(() => {
            fetch(`https://api.unsplash.com/search/photos/?client_id=M8L6exexUdx5oL-mxRc3bHBr20nweyMD209LDRFQpbs&query=${inputValue}`).then(apiData => {
                return apiData.json();
            }).then(actualData => {
                console.log(actualData.result);
                setData(actualData.results)
            });
        }, [data])
    }

    FetchData();

    return(
        <div className="image">
            <div className="inputItem">
                <input placeholder="Enter search item" value={inputValue} onChange={handleChange}/>
            </div>
            <div className="image-gallery">
                {
                    data.slice(0, visible).map((item) => {
                        return <img src={item.urls.regular} alt="itemImage" />
                    })
                }
            </div>
            <button onClick={handleClick}>Load More</button>
        </div>
    )
}

export default Image;