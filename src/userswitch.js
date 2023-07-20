import React from "react";


export default function UserSwitch() {


    return(
        <div>
            <form  method="post" >
                <div className="input-group">
                    <select className="form-control" asp-items="@Model" name="name"></select>
                    <button type="submit" className="btn btn-outline-light">Switch</button>
                </div>        
            </form>
        </div>
    );
}