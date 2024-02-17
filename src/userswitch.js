import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from './contexts'; 

const API_URL = process.env.REACT_APP_API_URL;


export default function UserSwitch() {
    const { setAdmin } = useContext(AdminContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = API_URL + "/CommerceDemo/Users";
        fetch(url)
            .then(response => response.json())
            .then(data => { setUsers(data); })
            .catch(err => {console.error(err);});
    }, []);

    const userTemplate = users.map((item, index) => (
        <option value={item.userName} key={item.id} >{item.userName} </option>
    ));

    const handleSwitch = () => {
        const selectedValue = document.getElementById("userName").value;
        console.log("selectedValue: " + selectedValue);
        setAdmin(selectedValue === "administrator"); 
    };

    return(
        <div>
           <div className="input-group">
                <select className="form-control" name="userName" id="userName">
                    {userTemplate}
                </select>
                <button type="button" className="btn btn-outline-light" onClick={handleSwitch}>Switch</button>
            </div>  
        </div>
    );

    // return(
    //     <div>
    //         <form method="put" onSubmit={handleSubmit} >
    //             <div className="input-group">
    //                 <select className="form-control" name="userName" >
    //                     {userTemplate}
    //                 </select>
    //                 <button type="submit" className="btn btn-outline-light">Switch</button>
    //             </div>        
    //         </form>
    //     </div>
    // );
}