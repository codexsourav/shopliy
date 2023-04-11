import Link from 'next/link';
import styles from './styles/productbox.module.css'
import handelapi from '../handelapi';
import { useState } from 'react';
import swal from 'sweetalert';

function Productbox({ poster, title, rating, sells, price, id }) {
    const [isdelete, setdelete] = useState(false)
    function fn(text, count) {
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    const deleteProduct = () => {
        swal({
            title: "Are you sure?",
            text: "Remove This Product",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const resdata = await handelapi("/manageproduct/" + id, "DELETE");
                    if (resdata.error) {
                        swal("Error", "This Product has been Not deleted!", {
                            icon: "error",
                        });
                    } else {
                        swal("Removed", "This Product has been deleted!", {
                            icon: "success",
                        });
                        setdelete(true);
                    }
                }
            }
            );

    }

    return (
        <div className={styles.product} style={isdelete ? { opacity: 0.2 } : null}>
            <div className={styles.box}>
                <img src={poster} />
                <h3>{fn(title, 15)}</h3>
                <div className="star">{rating} Stars : Ratings</div>
                <div className="star">{sells} Sells</div>
                <div className="star">{price} RS</div>
            </div>
            {isdelete ? "" : <div className={styles.links}>
                <Link href={"/admin/product/" + id} className={styles.edit}>Edit</Link>
                <p className={styles.delete} onClick={deleteProduct}>Delete</p>
            </div>}

        </div>
    )
}

export default Productbox;