import KEYS from '../../keys';
import styles from '../../styles/login.module.css'
import { useState } from 'react';
import swal from 'sweetalert';
import validator from 'validator';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';



function Login() {
    const [email, setemail] = useState('sourav0w@gmail.com');
    const [pass, setpass] = useState('sourav');
    const [loading, setloading] = useState(false);
    const router = useRouter();


    const onsubmit = async () => {
        try {
            if (validator.isEmpty(email) || !validator.isEmail(email)) {
                swal("Invalid Email", "Please Enter Your Valid Email ID", "info");
                return false;
            }
            if (validator.isEmpty(pass)) {
                swal("Enter Password", "Please Enter Your Password", "info");
                return false;
            }
            // send request on  server 
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                email, pass
            });
            setloading(true)
            let response = await fetch(KEYS.APIHOST + "/auth/login", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            let data = await response.json();
            setloading(false);
            if (data.error) {
                swal("Wrong", data.error, "error");
            } else if (data.success) {
                if (!data.isadmin) {
                    swal("Not Admin", "You Are Not Alegible To Acceess", "info");
                    return false;
                } else {
                    setCookie('user', data.token, { maxAge: 60 * 6 * 72, sameSite: true, path: "/", httpOnly: false });
                    router.push({
                        pathname: '/admin',
                    });

                }
            } else {
                swal("Wrong", data.error, "error");
                return false;
            }

        } catch (error) {
            setloading(false);
            swal("Oops!", "Maybe You Internet Not Working!", "error");
            console.log(error);
        }
    }
    return (
        <>
            <div className={styles.login} >
                <div className={styles.form}>
                    <h1 className={styles.title}>Login Admin Panel</h1>
                    <section>
                        <div className={styles.inpgroup}>
                            <label>Email ID</label>
                            <input type='text' autoComplete='off' className={styles.inp} value={email} onChange={val => setemail(val.target.value)} />
                        </div>
                        <div className={styles.inpgroup}>
                            <label>Password</label>
                            <input type='password' autoComplete='off' className={styles.inp} value={pass} onChange={val => setpass(val.target.value)} />
                        </div>
                        <input type='submit' value={loading ? "Chacking..." : "Login"} disabled={loading} className={styles.btn} onClick={onsubmit} />
                    </section>

                </div>
            </div>
        </>
    );
}

export default Login;