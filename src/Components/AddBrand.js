import React, { useEffect, useRef, useState } from "react";
import * as axios from "axios";
import { useDispatch } from "react-redux";
import { AddUpdateBrand } from "../ReduxModule/Actions";
import classes from "../Pages/Brands.module.css";

function AddBrand(props) {
  const BrandName = useRef();
  const dispatch = useDispatch();
  const [currentBrand, setCurrentBrand] = useState(props.selectedBrand);
  const apiAddUpdateBrand = async (brand) => {
    const response = await axios
      .post("https://localhost:44333/api/Brand", brand)
      .then((res) => {
        clearForm();
        if (res.data.brandId > 0) {
          dispatch(AddUpdateBrand(res.data));
        }else{
          console.log("Error AddBrand");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
   
  };

  const submitButton = (e) => {
    e.preventDefault();
    if (BrandName.current.value == "") {
      console.log("Please enter some Brand Name");
      return;
    }
    var brand = currentBrand;
    console.log(brand);
    apiAddUpdateBrand(brand);
  };

  const clearClick = (e) => {
    e.preventDefault();
    clearForm();
  };

  const clearForm = () => {
    var brand = {
      brandName: "",
      brandId: 0,
    };
    setCurrentBrand(brand);
  };

  //when parent chagnes value
  useEffect(() => {
    var brand = {
      brandName: props.selectedBrand.brandName,
      brandId: props.selectedBrand.brandId,
    };
    setCurrentBrand(brand);
  }, [props.selectedBrand]);

  //when types in input
  const onChange = (event) => {
    var brand = {
      brandName: BrandName.current.value,
      brandId: currentBrand.brandId,
    };
    setCurrentBrand(brand);
  };

  return (
    <div>
      <table  className={classes.tableClass}>
      <col width="300px" />
      <col width="100px" />
      <tbody>
        <td>
      <input
        value={currentBrand.brandName}
        type="text"
        ref={BrandName}
        onChange={onChange}
      ></input></td>
      <td>
      <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/save_16.png'} alt="image" onClick={(e) => submitButton(e)}/>
      {/* <button onClick={submitButton}>Submit Now</button> */}
      &nbsp;&nbsp;
      <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/reset_16.png'} alt="image" onClick={(e) => clearClick(e)}/>
      {/* <button onClick={clearClick}>Clear</button> */}
      </td>
      </tbody>
      </table>

    </div>
  );
}

export default AddBrand;
