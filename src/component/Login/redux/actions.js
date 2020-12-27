export const LOGIN = "[LOGIN] ADD_JWT";
export const LOGOUT = "[LOGOUT] LOGOUT_USER";
export function loginUser(user) {
  return { type: LOGIN, payload: user };
}
export function logoutUser(user) {
  return { type: LOGOUT, payload: user };
}
