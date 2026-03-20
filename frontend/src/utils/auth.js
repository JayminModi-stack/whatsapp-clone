export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
  const user = getUser();
  return user?.token;
};

export const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};
