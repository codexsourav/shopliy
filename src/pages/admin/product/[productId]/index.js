import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import handelapi from '../../../../handelapi';
import Navbar from '../../../../components/navbar';

function Index() {
    const router = useRouter();
    const id = router.query.productId;
    const [title, settitle] = useState('');
    const [desc, setdesc] = useState('');
    const [mainprice, setmainprice] = useState('');
    const [price, setprice] = useState('');
    const [poster, setposter] = useState('');
    const [images, setimages] = useState('');
    const [loading, setLoading] = useState(false)
    const [loaded, setloaded] = useState(false)
    const [gpublic, setpublic] = useState(false)


    const updateProduct = async () => {
        const makeimages = images.split(",");
        var filteredImages = makeimages.filter(function (el) {
            return el != "";
        });

        setLoading(true);
        var data = await handelapi("/manageproduct/" + id, "PUT", { title, desc, mainprice, price, poster, images: filteredImages, public: gpublic });
        setLoading(false);

        if (data.error) {
            swal("Invalid Data", data.error, "error")

        } else if (data.success) {
            swal("Product Updated", "Your Product Is Updated", "success");
        } else {
            swal("Error", data.error, "error")
        }

    }

    // get product info 

    const getProduct = async () => {

        var data = await handelapi("/product/" + id, "GET");
        setloaded(true);
        settitle(data.title);
        setdesc(data.desc);
        setimages(data.images.toString());
        setmainprice(data.mainprice);
        setposter(data.poster);
        setprice(data.price);
        setpublic(data.public);

        console.log(data);
    }
    useEffect(() => {
        if (!router.isReady) return;
        getProduct();
    }, [router.isReady])

    return (
        <>
            <Navbar />
            <div className="conatiner">
                <h2 style={{ textAlign: "center", marginTop: 50 }}>
                    Update Your Product
                </h2>
                {!loaded ? "Loading.." : <div className="form">
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
                    <div className="setinput">
                        <label>Public</label>
                        <select value={gpublic} onChange={e => setpublic(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <button className='makebutton' onClick={updateProduct} disabled={loading}>{loading ? "Updating.." : "Update Product"}</button>
                </div>}
            </div>
        </>
    )
}

export default Index;