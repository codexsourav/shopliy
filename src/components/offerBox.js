import Link from 'next/link';
import styles from './styles/productbox.module.css'
import handelapi from '../handelapi';
import { useState } from 'react';
import swal from 'sweetalert';

function OfferBox({ poster, id }) {
    const [isdelete, setdelete] = useState(false)

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
                    const resdata = await handelapi("/offer/" + id, "DELETE");
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
            </div>
            {isdelete ? "" : <div className={styles.links}>

                <p className={styles.delete} onClick={deleteProduct}>Delete</p>
            </div>}

        </div>
    )
}

export default OfferBox;