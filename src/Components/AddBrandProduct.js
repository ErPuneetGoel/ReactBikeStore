import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as axios from "axios";
import { AddUpdateProduct } from "../ReduxModule/Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../Pages/Brands.module.css";

function AddBrandProduct(props) {
  const refProductName = useRef();
  const refProductModelYear = useRef();
  const refProductListPrice = useRef();
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState(props.selectedProduct);
  const customId = "custom-id-yes";
  toast.configure({ autoClose: 2000 });

  const apiAddUpdateProduct = async (product) => {
    const response = await axios
      .post("https://localhost:44333/api/Products", product)
      .then((res) => {
        clearForm();
        dispatch(AddUpdateProduct(res.data));
        props.loaderVisibilityHandler(false);
        toast.success("Product added/updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Error while adding/updating product. Please check console for more information."
        );
        props.loaderVisibilityHandler(false);
      });
  };

  const submitButton = (e) => {
    props.loaderVisibilityHandler(true);
    e.preventDefault();
    if (
      refProductName.current.value &&
      refProductName.current.value != "" &&
      refProductListPrice.current.value &&
      refProductListPrice.current.value != "" &&
      refProductModelYear.current.value &&
      refProductModelYear.current.value != ""
    ) {
      var product = currentProduct;
      console.log(product);
      apiAddUpdateProduct(product);
    } else {
      props.loaderVisibilityHandler(false);
      toast.warning("Please enter valid input.", {
        autoClose: 5000,
        toastId: customId,
      });
      return;
    }
  };

  const clearClick = (e) => {
    props.loaderVisibilityHandler(true);
    e.preventDefault();
    clearForm();
    toast.success("Form Cleared.");
    props.loaderVisibilityHandler(false);
  };

  const clearForm = () => {
    var product = {
      brandId: props.selectedProduct.brandId,
      productId: 0,
      productName: "",
      modelYear: 2021,
      listPrice: 0,
      categoryId: 7,
    };
    setCurrentProduct(product);
  };

  //when parent chagnes value
  useEffect(() => {
    var product = {
      brandId: props.selectedProduct.brandId,
      productId: props.selectedProduct.productId,
      productName: props.selectedProduct.productName,
      modelYear: props.selectedProduct.modelYear,
      listPrice: props.selectedProduct.listPrice,
      categoryId: props.selectedProduct.categoryId,
    };
    setCurrentProduct(product);
  }, [props.selectedProduct]);

  //when types in input
  const onChange = (changeIn) => {
    var product = {
      brandId: currentProduct.brandId,
      productId: currentProduct.productId,
      productName: refProductName.current.value,
      modelYear: refProductModelYear.current.value,
      listPrice: refProductListPrice.current.value,
      categoryId: currentProduct.categoryId,
    };
    setCurrentProduct(product);
  };

  return (
    <div>
      <table className={classes.tableClass}>
        <col width="450px" />
        <col width="175px" />
        <col width="175px" />
        <col width="100px" />
        <tbody>
          <tr key={0}>
            <td>
              {" "}
              <input
                value={currentProduct.productName}
                type="text"
                ref={refProductName}
                onChange={() => onChange("ProductName")}
              ></input>
            </td>{" "}
            <td>
              {" "}
              <input
                value={currentProduct.modelYear}
                type="text"
                ref={refProductModelYear}
                onChange={() => onChange("ModelYear")}
              ></input>
            </td>{" "}
            <td>
              {" "}
              <input
                value={currentProduct.listPrice}
                type="text"
                ref={refProductListPrice}
                onChange={() => onChange("ListPrice")}
              ></input>
            </td>
            <td>
              &nbsp; &nbsp;
              <img
                className={classes.loaderImg}
                src={process.env.PUBLIC_URL + "/save_16.png"}
                alt="image"
                onClick={(e) => submitButton(e)}
              />
              &nbsp;&nbsp;
              <img
                className={classes.loaderImg}
                src={process.env.PUBLIC_URL + "/reset_16.png"}
                alt="image"
                onClick={(e) => clearClick(e)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddBrandProduct;
