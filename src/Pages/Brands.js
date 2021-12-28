import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SetBrands, DeleteBrand, fetchBrandsAPiRequest, deleteBrandsAPiRequest } from "../ReduxModule/Actions";
import AddBrand from "../Components/AddBrand";
import classes from "./Brands.module.css";

function Brands() {
  const myState = useSelector((state) => state.BrandsReducer);
  const dispatch = useDispatch();
  var [editedBrand, setEditedBrand] = useState({
    brandId: 0,
    brandName: "",
  });

  useEffect(() => {
    if (myState.length <= 0)
      fetchBrandsAPiRequest().then((resp) => {
          dispatch(SetBrands(resp.data));
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleEditBrand = (e, brand) => {
    e.preventDefault();
    setEditedBrand(brand);
  };

  const handleDeleteBrand = (e, brandId) => {
    e.preventDefault();
    if (window.confirm("Are yo Sure you want to delete this brand ?")) {
      deleteBrandsAPiRequest(brandId)
        .then((resp) => {
          dispatch(DeleteBrand(brandId));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>All Bikes</h1>
      <table className={classes.tableClass}>
      <col width="300px" />
      <col width="100px" />
        <thead><tr><th>Brand Name</th><th>Action</th></tr></thead>
        <tbody>
        {myState.length > 0 &&
          myState.sort((a, b) => (a.brandId > b.brandId ? 1 : -1)).map((brand) => (
            <tr key={brand.brandId}>
              <td>
              <Link to={"/Products/" + brand.brandId}>{brand.brandName}</Link>{" "}
              </td>
              <td>
              <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/edit_16.png'} alt="image" onClick={(e) => handleEditBrand(e, brand)}/>
              {/* <a onClick={(e) => handleEditBrand(e, brand)}>Edit</a> */}
              &nbsp;&nbsp;&nbsp;
              <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/delete_16.png'} alt="image" onClick={(e) => handleDeleteBrand(e, brand.brandId)}/>
              {/* <a onClick={(e) => handleDeleteBrand(e, brand.brandId)}>Delete</a> */}
              </td>
            </tr>
          ))}
          </tbody>
    </table>
      <AddBrand dispatcher={dispatch} selectedBrand={editedBrand} />
    </div>
  );
}

export default Brands;
