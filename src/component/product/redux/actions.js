export const REMOVE_PRODUCT = "[PRODUCT] REMOVE_PRODUCT";
export const ADD_PRODUCT = "[PRODUCT] ADD_PRODUCT";
export const EDIT_PRODUCT = "[PRODUCT] EDIT_PRODUCT";
export function removeProduct(product) {
  return { type: REMOVE_PRODUCT, payload: product };
}
export function addProduct(product) {
  return { type: ADD_PRODUCT, payload: product };
}
export function editProduct(product) {
  return { type: EDIT_PRODUCT, payload: product };
}
