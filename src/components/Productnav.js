import styles from './styles/navbar.module.css';
import Link from 'next/link'

function ProductNavbar() {
    return (
        <div className={styles.navbar} >
            <div className="title">
                <h3>ADMIN PANEL</h3>
            </div>
            <div className={styles.navlink}>
                <ul>
                    <li><Link href="/admin">Home</Link></li>
                    <li><Link href="/admin/product/add">Add</Link></li>
                    <li><Link href="/admin/products">Public</Link></li>
                    <li><Link href="/admin/orders">Private</Link></li>
                    <li><Link href="/logout">Logout</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ProductNavbar;