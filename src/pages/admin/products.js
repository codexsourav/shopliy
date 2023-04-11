import { useEffect, useState } from "react";
import Navbar from "../../components/navbar"
import handelapi from "../../handelapi";
import Productbox from "../../components/productbox";

function Product() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const [skip, setskip] = useState(0);
    const [moadmore, setmoadmore] = useState(true);
    const [loadmore, setloadmore] = useState(false);

    const getData = async () => {
        setloadmore(true);
        var gdata = await handelapi("/products/show/" + skip, "GET");
        setloading(false);
        setData([...data, ...gdata]);
        setskip(skip + 20)
        setloadmore(false);
        if (gdata.length == 0) {
            console.log(gdata.length);
            setmoadmore(false);
        }

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Navbar />

            <div className="product-list">
                {loading ? "Loading..." : data.length == 0 ? "No Products Found" : data.map((e) => {
                    return <Productbox key={e._id} id={e._id} poster={e.poster} price={e.price} rating={e.rating} title={e.title} sells={e.sell} />
                })}
            </div>
            <center> {loading ? "" : moadmore ? <button className="makebutton" onClick={getData} disabled={loadmore}>{loadmore ? "Loading..." : "Load More"}</button> : ""}</center>

        </>
    )
}

export default Product