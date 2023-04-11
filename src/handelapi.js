import { getCookie } from "cookies-next";
import KEYS from "./keys";

export default async (endpoint, method, body) => {
    try {
        let headersList = {
            "Accept": "*/*",
            "Authorization": "Bearer " + getCookie('user'),
            "Content-Type": "application/json"
        }


        let bodyContent = JSON.stringify(body);

        let response = await fetch(KEYS.APIHOST + endpoint, {
            method: method,
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { "error": "Request Error / Chack Your Network" }
    }

}