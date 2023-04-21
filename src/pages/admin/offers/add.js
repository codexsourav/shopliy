import React, { useState } from 'react'
import Navbar from '../../../components/navbar'

import swal from 'sweetalert';
import { useRouter } from 'next/router';
import handelapi from '../../../handelapi';
function AddOffer() {

    const [image, setimage] = useState('');
    const [productId, setproductId] = useState('');
    const [loading, setLoading] = useState(false)

    const addProduct = async () => {
        setLoading(true);
        var data = await handelapi("/offer", "POST", { image, productId });
        setLoading(false);

        if (data.error) {
            swal("Invalid Data", data.error, "error")

        } else if (data.success) {
            swal("Offer Added", "Your New Offer Is Added", "success");
            setproductId('');
            setimage('');

        } else {
            swal("Error", data.error, "error")
        }

    }

    return (
        <>
            <Navbar />
            <div className="conatiner">
                <h2 style={{ textAlign: "center", marginTop: 50 }}>
                    Add New Offer
                </h2>
                <div className="form">
                    <div className="setinput">
                        <label>Product ID</label>
                        <input type="text" value={productId} onChange={e => setproductId(e.target.value)} />
                    </div>

                    <div className="setinput">
                        <label>Offer Image Url</label>
                        <input type="text" value={image} onChange={e => setimage(e.target.value)} />
                    </div>
                    <button className='add-btn' onClick={addProduct} disabled={loading}>{loading ? "Adding.." : "Add Offer"}</button>
                </div>
            </div>
        </>
    )
}

export default AddOffer