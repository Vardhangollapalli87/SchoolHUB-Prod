

import * as types from "./types";
import axios from "axios";


axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "" // same origin in production (React build served by Express)
    : "http://localhost:7000"; // local development

// Optional: set default headers if needed
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; // if using cookies





// -------------------- LOGIN ACTIONS --------------------

// Student login
export const StudentLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_STUDENT_REQUEST });
    const res = await axios.post(`/students/login`, data);
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
    const res = await axios.post(`/teachers/login`, data);
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
    const res = await axios.post(`/admin/login`, data);
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
    const res = await axios.post(`/teachers/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Register student
export const StudentRegister = (data) => async () => {
  try {
    const res = await axios.post(`/students/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Register admin
export const AdminRegister = (data) => async () => {
  try {
    const res = await axios.post(`/admin/register`, data);
    return res.data;
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
    const res = await axios.patch(`/students/${id}`, data);
    dispatch({ type: types.EDIT_STUDENT_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

// Update teacher
export const UpdateTeacher = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_TEACHER_REQUEST });
    const res = await axios.patch(`/teachers/${id}`, data);
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
    const res = await axios.post(`/admin/password`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Forgot password (admin)
export const forgetPassword = (data) => async () => {
  try {
    const res = await axios.post(`/admin/forgot`, data);
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
    const response = await axios.get(`/teachers`);
    dispatch({ type: "FETCH_TEACHERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_TEACHERS_FAIL", payload: error.response?.data?.message || error.message });
  }
};



// Update student image
export const UpdateStudentImage = (userId, imageUrl) => async (dispatch, getState) => {
  try {
    // Update in backend if needed
    const res = await axios.patch(`/students/${userId}`, { image: imageUrl });
    // Update Redux store
    dispatch({ type: types.EDIT_STUDENT_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log("Error updating student image:", error);
  }
};

// Update teacher image
export const UpdateTeacherImage = (userId, imageUrl) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(`/teachers/${userId}`, { image: imageUrl });
    dispatch({ type: types.EDIT_TEACHER_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log("Error updating teacher image:", error);
  }
};

