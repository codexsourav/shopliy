import React, { useState } from 'react'
import Navbar from '../../../components/navbar'

import swal from 'sweetalert';
import { useRouter } from 'next/router';
import handelapi from '../../../handelapi';
function Addproduct() {

    const router = useRouter();
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [mainprice, setmainprice] = useState('');
    const [price, setprice] = useState('');
    const [poster, setposter] = useState('');
    const [images, setimages] = useState('');
    const [loading, setLoading] = useState(false)

    const addProduct = async () => {
        const makeimages = images.split(",")
        var filteredImages = makeimages.filter(function (el) {
            return el != "";
        });


        setLoading(true);
        var data = await handelapi("/manageproduct", "POST", { title, desc, mainprice, price, poster, images: filteredImages });
        setLoading(false);

        if (data.error) {
            swal("Invalid Data", data.error, "error")

        } else if (data.success) {
            swal("Product Added", "Your Product Is Added", "success");
            settitle('');
            setdesc('');
            setimages('');
            setmainprice('');
            setposter('');
            setprice('');

        } else {
            swal("Error", data.error, "error")
        }

    }

    return (
        <>
            <Navbar />
            <div className="conatiner">
                <h2 style={{ textAlign: "center", marginTop: 50 }}>
                    Add New Product
                </h2>
                <div className="form">
                    <div className="setinput">
                        <label>Product Name</label>
                        <input type="text" value={title} onChange={e => settitle(e.target.value)} />
                    </div>
                    <div className="setinput">
                        <label>Product Description</label>
                        <textarea type="text" style={{ height: 120 }} value={desc} onChange={e => setdesc(e.target.value)} />
                    </div>
                    <div className="setinput">
                        <label>Display Price</label>
                        <input type="number" value={mainprice} onChange={e => setmainprice(e.target.value)} />
                    </div>
                    <div className="setinput">
                        <label>Selling Price</label>
                        <input type="number" value={price} onChange={e => setprice(e.target.value)} />
                    </div>
                    <div className="setinput">
                        <label>Display Image Url</label>
                        <input type="text" value={poster} onChange={e => setposter(e.target.value)} />
                    </div>

                    <div className="setinput">
                        <label>Product Images Url <small>(EX: url1.jpg,url2.jpg,url3,url4.jpg)</small></label>
                        <input type="text" value={images} onChange={e => setimages(e.target.value)} />
                    </div>
                    <button className='makebutton' onClick={addProduct} disabled={loading}>{loading ? "Adding.." : "Add Product"}</button>
                </div>
            </div>
        </>
    )
}

export default Addproduct