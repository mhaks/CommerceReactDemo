import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext, CartItemCountContext } from './contexts'; 
import { setToken, getToken } from "./site";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function UserSwitch() {
    const { setAdmin } = useContext(AdminContext);  
    const { setCartItemCount } = useContext(CartItemCountContext);  
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // running once to login as jerry
        fetch(`${API_URL}/CommerceDemo/Login?userName=jerry`, {
            method: "POST", 
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify("jerry")
        })
            .then(response => response.json())
            .then(data => { 
                setToken(data.token);
                fetch(`${API_URL}/Shopping/Cart`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${getToken()}` }
                })
                .then(response => response.json())
                .then(data => { setCartItemCount(data?.products?.length)})
                .catch(err => {
                    console.error(err); 
                    throw err;
            });
            })
            .catch(err => console.error(err));
        

        fetch(`${API_URL}/CommerceDemo/Users`)
            .then(response => response.json())
            .then(data => { 
                setUsers(data); 
                const select = document.getElementById("userId");
                select.value = "jerry";

           })
            .catch(err => {console.error(err);});
    }, []);

    const userTemplate = users.map((item) => (
        <option value={item.userName} key={item.userName} data-admin={item.isAdministrator}>{item.userName}</option>
    ));

   
    async function handleSwitch() {          
        const selected = document.getElementById("userId").selectedOptions[0];  
        if(!selected) return;

        await fetch(`${API_URL}/CommerceDemo/Login?userName=${selected.value}`, {
            method: "POST", 
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({userName: selected.value})
        })
        .then(response => response.json())
        .then(data => { 
            setToken(data.token);
        })
        .catch(err => console.error(err));

        let isAdmin = selected.getAttribute("data-admin");      
        setAdmin(isAdmin === "true");

        if (isAdmin === "false") {
            await fetch(`${API_URL}/Shopping/Cart`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${getToken()}` }
            })
            .then(response => response.json())
            .then(data => { setCartItemCount(data?.products?.length)})
            .catch(err => console.error(err));
        }

        navigate("/"); 
    }
    return(
        <div>
           <div className="input-group">
                <select className="form-control" name="userId" id="userId">
                    {userTemplate}
                </select>
                <button type="button" className="btn btn-outline-light" onClick={handleSwitch}>Switch</button>
            </div>  
        </div>
    );
   
}