import { Status } from "@/global/Status";
import { API } from "@/http";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: null,
    token: null,
    role: null,
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetStatus(state) {
      state.status = null;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    },
  },
});

export const { setStatus, setUser, resetStatus, setToken, setRole, logout } =
  authSlice.actions;
export default authSlice.reducer;

export function register(data) {
  return async function registerThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("register", data);
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response?.data?.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response?.data?.message);
    }
  };
}

export function login(data) {
  return async function loginThunk(dispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("login", data);
      if (response.status === 200) {
        const user = response?.data?.user;
        const token = response?.data?.data;

        // Save the token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user?.role);
        localStorage.setItem("username", user.username);
        localStorage.setItem("userid", user.id);

        dispatch(setUser(user));
        dispatch(setToken(token));
        dispatch(setRole(user?.role));

        dispatch(setStatus(Status.SUCCESS));
        toast.success(response?.data?.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response?.data?.message);
    }
  };
}
