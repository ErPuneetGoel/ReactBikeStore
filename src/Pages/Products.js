import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddBrandProduct from "../Components/AddBrandProduct";
import LoaderSpinner from '../Components/Spinner';
import { SetLoaderState,SetProducts, DeleteProduct,fetchBrandProductsAPiRequest, deleteProductsAPiRequest  } from "../ReduxModule/Actions";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classes from "./Brands.module.css";

function Products() {
  const params = useParams();
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.ProductsReducer);
  const myBrandState = useSelector((state) => state.BrandsReducer);
  var [editedProduct, setEditedProduct] = useState({ brandId : params.id,
    productId: 0,
    productName : '',
    modelYear : 2021,
    listPrice : 0,
    categoryId : 7
  });

  const showHideLoader = (isShow) => {
    dispatch(SetLoaderState(isShow));
  }

  const editProductClick = (e, product) =>{
    e.preventDefault();
    toast('Editing Product ' + product.productName, {autoClose:1000});
    setEditedProduct(product);
  }

  const deleteProductClick = (e, productId) =>{
    e.preventDefault();
    if (window.confirm("Are yo Sure you want to delete this brand ?")) {
      showHideLoader(true);
      deleteProductsAPiRequest(productId)
        .then((resp) => {          
          dispatch(DeleteProduct(productId));
          toast('Product Deleted');
          showHideLoader(false);
        })
        .catch((err) => {          
          showHideLoader(false);
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (myState.length <= 0 || myState.filter((b) => b.brandId == params.id).length <= 0) {
      showHideLoader(true);
      fetchBrandProductsAPiRequest(params.id)
        .then((resp) => {
          dispatch(SetProducts(resp.data));
          showHideLoader(false);
        })
        .catch((err) => {          
          showHideLoader(false);
          console.log(err);
        });
    }
  }, []);

  const currentBrandProducts = myState
  .filter((b) => b.brandId == params.id)
  .sort((a, b) => (a.productId > b.productId ? 1 : -1));
  return (
    <div>
      <h1>
      Products by {myBrandState.length > 0 &&
          myBrandState.filter((b) => b.brandId == params.id)[0].brandName}        
      </h1>
      <LoaderSpinner />
     
      <div class="bodycontainer">
      <table  className={classes.tableClass}>
      <col width="450px" />
        <col width="175px" />
        <col width="175px" />
        <col width="100px" />
        <thead>       
          <tr>
            <th>Name</th>
            <th>Model Year</th>
            <th>List Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myState.length > 0 &&
           currentBrandProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td> <td>{product.modelYear}</td>{" "}
                  <td>{product.listPrice}</td>
                  <td>
                  &nbsp; &nbsp;
                  <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/edit_16.png'} alt="image" onClick={(e) => editProductClick(e, product)}/>
                  {/* <button onClick={(e) => editProductClick(e, product)}>&nbsp;Edit&nbsp;</button>  */}
                  &nbsp; &nbsp;
                  <img className={classes.loaderImg} src={process.env.PUBLIC_URL + '/delete_16.png'} alt="image" onClick={(e) => deleteProductClick(e, product.productId)}/>
                  {/* <button onClick={(e) => deleteProductClick(e, product.productId)}>Delete</button> */}
                  </td>
                </tr>
              ))}
              {currentBrandProducts <= 0 &&
              <tr><td colSpan={4} align="center">No Record Found</td></tr>
          }
        </tbody>
      </table>
      
      </div>
      <AddBrandProduct
        selectedProduct={editedProduct}
        loaderVisibilityHandler={showHideLoader}
      />
    </div>
  );
}

export default Products;