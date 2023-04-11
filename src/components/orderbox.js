
import { useState } from "react";
import handelapi from "../handelapi";

import swal from "sweetalert";
function Orderbox({ data, nextStep, styles }) {
    const [loading, setLoading] = useState(false);
    const [task, settask] = useState(false);

    function fn(text, count) {
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    const makeAction = async () => {
        setLoading(true);
        const resdata = await handelapi('/manageorder/status/' + data._id, "PUT", { "status": nextStep });
        setLoading(false);

        if (resdata.error) {
            swal('Error', resdata.error, "error");
            return false;
        } else {
            settask(true);
        }

    }
    return (
        <div className={styles.orderbox} style={task ? { opacity: 0.2 } : null}>
            <img src={data.product.poster} height='180px' />
            <div className={styles.info}>
                <ul>
                    <h3>{fn(data.product.title, 15)}</h3>
                    <li>OrderID:{data._id}</li>
                    <li>Quantity: {data.quantity} </li>
                    <li>Price: {data.buyPrice * data.quantity} </li>
                    <li>Payment Type: {data.paymentType} </li>
                    <li>Date: {data.date} </li>
                </ul>
                <br />

                <ul>
                    <h4>Adress</h4>
                    <li>Name {data.address.name} </li>
                    <li>Mobile:  {data.address.mobile}</li>
                    <li>{data.address.addr1 + "," + data.address.addr2}<br />{data.address.city + "," + data.address.state + "," + data.address.pincode}</li>
                </ul>
            </div>
            {nextStep == false ? "" : task ? "" : <button className={styles.action} onClick={makeAction} disabled={loading}>{loading ? "Loading..." : "Make " + nextStep}</button>}
        </div>
    )
}

export default Orderbox