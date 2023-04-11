import { useState } from "react";
import handelapi from "../../../handelapi";
import swal from "sweetalert";
import Navbar from "../../../components/navbar";
import Productbox from "../../../components/productbox";



function Search() {
    const [data, setData] = useState([]);
    const [issearch, setissearch] = useState(true);
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState('');

    const searchData = async () => {
        if (search.length == 0) {
            swal("Ooop!", "Enter Search Info", "info")
            return false;
        }
        setloading(true);
        setissearch(false);
        var gdata = await handelapi("/products/search/" + search, "POST");
        setloading(false);
        if (gdata.error) {
            swal("Ooop!", gdata.error, "info")
            return false;
        }
        setData(gdata);
        // console.log(gdata);
    }


    return (
        <>
            <Navbar />
            <div className="conatiner">
                <div className="setinputsearch" style={{ margin: 50 }}>
                    <input type="text" onChange={e => setsearch(e.target.value)} placeholder="Search Here.." />
                    <button className="" onClick={searchData}>Search</button>
                </div>
                <div className="product-list">
                    {issearch ? "" : loading ? "Searching..." : data.length == 0 ? "No Products Found" : data.map((e) => {
                        return <Productbox key={e._id} id={e._id} poster={e.poster} price={e.price} rating={e.rating} title={e.title} sells={e.sell} />
                    })}
                </div>

            </div>
        </>
    )
}

export default Search