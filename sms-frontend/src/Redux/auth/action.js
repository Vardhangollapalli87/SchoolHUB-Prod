

import * as types from "./types";
import axios from "axios";

// Base URL for your backend
const BASE_URL = "http://localhost:7000";

// -------------------- LOGIN ACTIONS --------------------

// Student login
export const StudentLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_STUDENT_REQUEST });
    const res = await axios.post(`${BASE_URL}/students/login`, data);
    dispatch({
      type: types.LOGIN_STUDENT_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_STUDENT_ERROR,
      payload: { message: error.response?.data?.message || "Something went wrong" },
    });
    return { message: error.response?.data?.message || "Something went wrong" };
  }
};

// Teacher login
export const TeacherLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_TEACHER_REQUEST });
    const res = await axios.post(`${BASE_URL}/teachers/login`, data);
    dispatch({
      type: types.LOGIN_TEACHER_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_TEACHER_ERROR,
      payload: { message: error.response?.data?.message || "Something went wrong" },
    });
    return { message: error.response?.data?.message || "Something went wrong" };
  }
};

// Admin login
export const AdminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    const res = await axios.post(`${BASE_URL}/admin/login`, data);
    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: { message: error.response?.data?.message || "Something went wrong" },
    });
    return { message: error.response?.data?.message || "Something went wrong" };
  }
};

// -------------------- REGISTER ACTIONS --------------------

// Register teacher
export const TeacherRegister = (data) => async () => {
  try {
    const res = await axios.post(`${BASE_URL}/teachers/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Register student
export const StudentRegister = (data) => async () => {
  try {
    const res = await axios.post(`${BASE_URL}/students/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Register admin
export const AdminRegister = (data) => async () => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// -------------------- BUS REGISTER --------------------
export const BusRegister = (data) => async (dispatch) => {
  try {
    await axios.post(`${BASE_URL}/bus/add`, data);
  } catch (error) {
    console.log(error);
  }
};

// -------------------- LOGOUT --------------------
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_LOGOUT });
  } catch (error) {
    console.log(error);
  }
};

// -------------------- UPDATE ACTIONS --------------------

// Update student
export const UpdateStudent = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_STUDENT_REQUEST });
    const res = await axios.patch(`${BASE_URL}/students/${id}`, data);
    dispatch({ type: types.EDIT_STUDENT_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

// Update teacher
export const UpdateTeacher = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TEACHER_REQUEST });
    const res = await axios.patch(`${BASE_URL}/teachers/${id}`, data);
    dispatch({ type: types.EDIT_TEACHER_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

// -------------------- PASSWORD ACTIONS --------------------

// Send password (admin)
export const SendPassword = (data) => async () => {
  try {
    // console.log("🚀 Received password reset request frontend:", data);
    const res = await axios.post(`${BASE_URL}/admin/password`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Forgot password (admin)
export const forgetPassword = (data) => async () => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/forgot`, data);
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

// -------------------- FETCH TEACHERS --------------------

// Fetch all teachers (admin only)
export const fetchTeachers = () => async (dispatch) => {
  dispatch({ type: "FETCH_TEACHERS_REQUEST" });
  try {
    const response = await axios.get(`${BASE_URL}/teachers`);
    dispatch({ type: "FETCH_TEACHERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_TEACHERS_FAIL", payload: error.response?.data?.message || error.message });
  }
};
