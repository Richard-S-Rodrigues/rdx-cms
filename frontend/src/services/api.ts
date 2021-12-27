import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000"
});

export const logout = async () => {
  try {
    await api.get("/logout", { withCredentials: true });

    localStorage.removeItem("rdxcms:user_info");
    window.location.reload();
  } catch (err: any) {
    console.error(err.message);
  }
};
