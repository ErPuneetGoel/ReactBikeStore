const initialStateChangeNum = 0;
export const changeNumber = (state = initialStateChangeNum, action) => {
  switch (action.type) {
    case "SetNumber":
      return (state = action.payload);
    case "Increament":
      return state + 1;
    case "Decreament":
      return state - 1;
    default:
      return state;
  }
};

export const BrandsReducer = (state = [], action) => {
  switch (action.type) {
    case "SetBrands":
      return state.concat(action.payload);
    case "AddUpdateBrand":
      return [].concat(
        action.payload,
        state.filter((p) => p.brandId != action.payload.brandId)
      );
      case "DeleteBrand":
        return state.filter((p) => p.brandId != action.payload);
    default:
      return state;
  }
};

export const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case "SetProducts":
      return state.concat(action.payload);
    case "AddUpdateProduct":
      return [].concat(
        action.payload,
        state.filter((p) => p.productId != action.payload.productId)
      );
    case "DeleteProduct":
        return state.filter((p) => p.productId != action.payload);
    default:
      // need this for default case
      return state;
  }
};


export const ApplicationLoader = (state = false, action) => {
  switch (action.type) {
    case "SetLoaderState":
      return action.payload;
    default:
      return state;
  }
};
