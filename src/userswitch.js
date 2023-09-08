import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function UserSwitch() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = API_URL + "/CommerceDemo/Users";
        fetch(url)
            .then(response => response.json())
            .then(data => { setUsers(data); })
            .catch(err => {console.error(err);});
    }, []);

    const userTemplate = users.map((item, index) => (
        <option value={item.id} key={item.id}>{item.userName}</option>
    ));

    return(
        <div>
            <form  method="post" >
                <div className="input-group">
                    <select className="form-control" name="name">
                        {userTemplate}
                    </select>
                    <button type="submit" className="btn btn-outline-light">Switch</button>
                </div>        
            </form>
        </div>
    );
}