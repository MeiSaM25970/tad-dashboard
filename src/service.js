import axios from "axios";
import { API_ADDRESS_SERVICE } from "./env";

var JWT = undefined;
export async function userInfo() {
  JWT =
    window.localStorage.getItem("userInfo") ||
    window.sessionStorage.getItem("userInfo");
  JWT = JSON.parse(JWT);
  if (!JWT) {
    window.location.replace("/login");
  }
}

export async function createProduct(product) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "products", product, headers);
}

export async function uploadImage(img) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "upload", img, headers);
}

export async function fetchProduct() {
  return await axios.get(API_ADDRESS_SERVICE + "products");
}

export async function register(newUser) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "auth/register", newUser, headers);
}

export async function login(userInfo) {
  return axios.post(API_ADDRESS_SERVICE + "auth/login", userInfo);
}
export async function fetchOrder() {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "payment", headers);
}
export async function orderById(id) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "orderDetail/" + id, headers);
}
export async function orderEdit(id, orderEdited) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.put(
    API_ADDRESS_SERVICE + "orderDetail/" + id,
    orderEdited,
    headers
  );
}
export async function deleteOrder(id) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(API_ADDRESS_SERVICE + "orderDetail/" + id, headers);
}
export async function fetchProductById(id) {
  return axios.get(API_ADDRESS_SERVICE + "products/" + id);
}
export async function deleteProduct(id) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(API_ADDRESS_SERVICE + "products/" + id, headers);
}
export async function EditProduct(id, product) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.put(API_ADDRESS_SERVICE + "products/" + id, product, headers);
}
export async function createCategories(category) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "categories", category, headers);
}

export async function fetchCategories() {
  return axios.get(API_ADDRESS_SERVICE + "categories");
}
export async function fetchUserInfo(username) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "userInfo/" + username, headers);
}
export async function uploadUserImg(img) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "upload/userImage", img, headers);
}
export async function editProfile(newUserInfo) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(
    API_ADDRESS_SERVICE + "userInfo/editProfile",
    newUserInfo,
    headers
  );
}
export async function changePassword(newPassword) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(
    API_ADDRESS_SERVICE + "changePassword",
    newPassword,
    headers
  );
}
export async function createAbout(about) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "about", about, headers);
}
export async function updateAbout(id, about) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "about/" + id, about, headers);
}
export function fetchAbout() {
  return axios.get(API_ADDRESS_SERVICE + "about");
}
export async function fetchContact() {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "contact", headers);
}
export async function updateConcat(id, contact) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "contact/" + id, contact, headers);
}
export async function deleteContact(_id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(API_ADDRESS_SERVICE + "contact/" + _id, headers);
}
export async function fetchContactById(id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "contact/" + id, headers);
}
export async function deleteCategory(id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(API_ADDRESS_SERVICE + "categories/" + id, headers);
}
export async function updateCategory(id, category) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.put(API_ADDRESS_SERVICE + "categories/" + id, category, headers);
}
export async function uploadWeblogImg(img) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "upload/weblog", img, headers);
}
// weblog Service
export async function createWeblog(weblog) {
  await userInfo();

  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.post(API_ADDRESS_SERVICE + "weblog", weblog, headers);
}
export async function updateWeblog(id, weblog) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.put(API_ADDRESS_SERVICE + "weblog/" + id, weblog, headers);
}
export function fetchWeblog() {
  return axios.get(API_ADDRESS_SERVICE + "weblog");
}
export async function deleteWeblog(id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(API_ADDRESS_SERVICE + "weblog/" + id, headers);
}
export function fetchComments() {
  return axios.get(API_ADDRESS_SERVICE + "comments");
}

export async function updateComments(id, comment) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.put(API_ADDRESS_SERVICE + "comments/" + id, comment, headers);
}
export async function deleteComment(id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(API_ADDRESS_SERVICE + "comments/" + id, headers);
}
export async function findCommentById(id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "comments/comment/" + id, headers);
}
export function filterCommentsByWeblogId(weblogId) {
  return axios.get(API_ADDRESS_SERVICE + "comments/" + weblogId);
}
export function findWeblogById(id) {
  return axios.get(API_ADDRESS_SERVICE + "weblog/" + id);
}
export async function counter() {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "counter", headers);
}
export async function fetchUsers(id) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "auth/users?username=" + id, headers);
}
export async function deleteUser(adminUsername, userId) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.delete(
    API_ADDRESS_SERVICE + "auth/" + adminUsername + "?id=" + userId,
    headers
  );
}
export async function findByUserName(username) {
  await userInfo();
  var headers = JWT
    ? {
        headers: {
          Authorization: "Bearer " + JWT.token,
        },
      }
    : undefined;
  return axios.get(API_ADDRESS_SERVICE + "auth/" + username, headers);
}
