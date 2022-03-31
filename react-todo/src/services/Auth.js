import { apiAuth } from "./Api";

const login = (payload) => {
  return apiAuth().post("/login", payload);
};

export { login };
