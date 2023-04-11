import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import Productbox from "../../components/productbox"
import handelapi from "../../handelapi";

function Index() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);

    const getData = async () => {
        var gdata = await handelapi("/products", "GET");
        setloading(false);
        setData(gdata);
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <Navbar />
            <h2 style={{ textAlign: "center", marginTop: 50 }}>
                Best Sell Products
            </h2>

            <div className="product-list">
                {loading ? "Loading..." : data.length == 0 ? "No Products Found" : data.map((e) => {
                    return <Productbox key={e._id} id={e._id} poster={e.poster} price={e.price} rating={e.rating} title={e.title} sells={e.sell} />
                })}
            </div>

        </>
    )
}

export default Index