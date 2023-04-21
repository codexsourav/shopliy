import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar"
import OfferBox from "../../../components/offerBox"
import handelapi from "../../../handelapi";
import Link from "next/link";

function Index() {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);

    const getData = async () => {

        var gdata = await handelapi("/offer/", "GET");
        setloading(false);
        setData(gdata);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Navbar />
            <Link href="/admin/offers/add" className="add-btn">New Offer</Link>
            <div className="product-list">
                {loading ? "Loading..." : data.length == 0 ? "No Products Found" : data.map((e) => {
                    return <OfferBox key={e._id} id={e._id} poster={e.image} />
                })}
            </div>

        </>
    )
}

export default Index