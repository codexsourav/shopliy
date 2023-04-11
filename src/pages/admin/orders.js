import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/tab.module.css";
import Orderbox from "../../components/orderbox";
import handelapi from "../../handelapi";
import swal from "sweetalert";


function Orders() {
    const [active, setActive] = useState(1);
    const [data, setData] = useState([])
    const [loading, setloading] = useState(true);
    const ordersType = ["Cancel", "Place Order", "Packed", "Shipped", "Out Of Delevery", "Delivered"];

    const getOrder = async (activeindex) => {
        setloading(true);
        const resdata = await handelapi("/manageorder/status", 'POST', { "status": ordersType[activeindex] });
        setloading(false);
        if (resdata.error) {
            swal('Oops!', resdata.error, "error");
            return false;
        }
        setData(resdata);

    }


    useEffect(() => {
        getOrder(active);
    }, [])

    const setTab = async (tab) => {
        setActive(tab);
        getOrder(tab);
    }


    return (
        <>
            <Navbar />
            <div className={styles.tabbar}>
                <ul>
                    {ordersType.map((e, index) => {
                        return <li key={index} className={active == index ? styles.active : null} onClick={() => setTab(index)}>{e} {active == index ? loading ? "" : data.length : ""} </li>
                    })}
                </ul>
            </div>

            {/* order view box  */}
            <div className="conatiner">
                {loading ? "Loading.." : data.map((e) => {
                    return <Orderbox key={e._id} data={e} styles={styles} nextStep={ordersType.length == active + 1 ? false : e.status == "cancel" ? false : ordersType[active + 1]} />
                })}

            </div>
        </>
    )
}

export default Orders