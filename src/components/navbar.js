import styles from './styles/navbar.module.css';
import Link from 'next/link'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

function Navbar() {
    const router = useRouter();
    const logout = () => {
        deleteCookie("user");
        router.push({
            pathname: '/auth/login',
        });

    }
    return (
        <div className={styles.navbar} >
            <div className="title">
                <h3>ADMIN PANEL</h3>
            </div>
            <div className={styles.navlink}>
                <ul>
                    <li><Link href="/admin">Home</Link></li>
                    <li><Link href="/admin/product/add">Add Product</Link></li>
                    <li><Link href="/admin/products">Products</Link></li>
                    <li><Link href="/admin/product/private">Private</Link></li>
                    <li><Link href="/admin/offers">Offers</Link></li>
                    <li><Link href="/admin/orders">Orders</Link></li>
                    <li><Link href="/admin/product/search">Search</Link></li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;