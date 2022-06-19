import React from "react";
import './main.css'
export default function ConfirmBox(props){
   

   
    

    
return(
    <>
    <div className= "confirm-bg">
        <div className="confirm-box">
            <p className="confirm-text"> Is this task completed?</p>
            <div className="confirm-button-box">
            <button className="confirm-button"  onClick={ props.handleDialogOption}>Yes</button>
            <button className="confirm-button"  onClick={props.handleDialogOption}>No</button>
            </div>
        </div>

    </div>
    
    </>
)

}