import { useContext, useEffect, useState } from "react";
import { UserContext,  AdminContext } from './contexts'; 

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export default function UserSwitch() {
    const { setUser } = useContext(UserContext);  
    const { setAdmin } = useContext(AdminContext);  
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = API_URL + "/CommerceDemo/Users";
        fetch(url)
            .then(response => response.json())
            .then(data => { 
                setUsers(data); 
                const select = document.getElementById("userId");
                select.value = "jerry";
                handleSwitch();
            })
            .catch(err => {console.error(err);});
    }, []);

    const userTemplate = users.map((item) => (
        <option value={item.userName} key={item.userName} data-admin={item.isAdministrator}>{item.userName}</option>
    ));

   
    async function handleSwitch() {          
        const selected = document.getElementById("userId").selectedOptions[0];  
        if(!selected) return;

        console.log("selectedUser: " + selected.value);

        await fetch(`${API_URL}/CommerceDemo/Users?userName=${selected.value}`, {
            method: "POST",
        })
        .then(response => response.json())
        .then(data => { console.log(data); })
        .catch(err => console.error(err));

        setUser(selected.value);          
        setAdmin(selected.getAttribute("data-admin") === "true");       
    };

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