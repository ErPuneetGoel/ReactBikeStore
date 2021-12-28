import * as axios from "axios";
const appBaseUrl = process.env.REACT_APP_API_URL;

export const SetNumber = (num) => {
    return {
      type: "SetNumber",
      payload : num
    };
  };

export const incNum = (num) => {
  return {
    type: "Increament",
    payload : num
  };
};

export const decNum = (num) => {
  return {
    type: "Decreament",
    payload: num
  };
};

//#region Brands Action
export const SetBrands = (arrBrands) => {
  return {
    type: "SetBrands",
    payload : arrBrands
  };
};
export const AddUpdateBrand = (brand) => {
  return {
    type: "AddUpdateBrand",
    payload : brand
  };
};

export const DeleteBrand = (brandId) => {
  return {
    type: "DeleteBrand",
    payload : brandId
  };
};

export const fetchBrandsAPiRequest = async () => {
  // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const request = await axios
    .get(appBaseUrl + "/Brand");
    return request;
};

export const deleteBrandsAPiRequest = async (brandId) => {
  // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const request = await axios
    .delete(appBaseUrl + "/Brand/" + brandId);
    return request;
};
//#endregion

//#region Products Action
export const SetProducts = (arrProducts) => {
  return {
    type: "SetProducts",
    payload : arrProducts
  };
};

export const AddUpdateProduct = (product) => {
  return {
    type: "AddUpdateProduct",
    payload : product
  };
};

export const DeleteProduct = (productId) => {
  return {
    type: "DeleteProduct",
    payload : productId
  };
};

export const fetchBrandProductsAPiRequest = async (brandId) => {
  // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const request = await axios
    .get(appBaseUrl + "/Products/"+brandId);
    return request;
};

export const deleteProductsAPiRequest = async (productId) => {
  // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const request = await axios
    .delete(appBaseUrl + "/Products/" + productId);
    return request;
};
//#endregion

//#region Products Action
//Show hide loader
export const SetLoaderState = (isShowLoader) => {
  return {
    type: "SetLoaderState",
    payload : isShowLoader
  };
};
//#endregion