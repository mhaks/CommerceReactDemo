import React, { useEffect, useState } from "react";
import { Form, } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function UserSwitch() {

    const [users, setUsers] = useState([]);
    const[selectedUser, setSelectedUser] = useState();

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

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData);
        console.log(formData.get("userName"));
        const url = API_URL + "/CommerceDemo/ChangeUser";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formData.get("userName")
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error("Error switching user");
        }
    }

  

    return(
        <div>
            <form method="post" onSubmit={handleSubmit} >
                <div className="input-group">
                    <select className="form-control" name="userName" >
                        {userTemplate}
                    </select>
                    <button type="submit" className="btn btn-outline-light">Switch</button>
                </div>        
            </form>
        </div>
    );
}