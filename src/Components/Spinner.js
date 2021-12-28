import React from "react";
import { useSelector } from "react-redux";
import classes from '../Components/Spinner.module.css'

function LoaderSpinner(){
    const myState = useSelector((state) => state.ApplicationLoader);

    return <div>
        { myState &&
        <div className={classes.loaderdiv}>
        <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/spinner.gif'}alt="image" />       
</div>}
    </div>
}

export default LoaderSpinner;