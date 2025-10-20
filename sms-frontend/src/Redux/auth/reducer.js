
import * as types from "./types";

// -------------------- AUTH REDUCER --------------------
const TOKEN = localStorage.getItem("token");

const initialAuthState = {
  userLogin: { loading: false, error: false, message: "" },
  userLogout: { message: "" },
  data: {
    isAuthenticated: !!TOKEN,
    token: TOKEN,
    user: null,
  },
};

export default function authReducer(state = initialAuthState, { type, payload }) {
  switch (type) {
    // ---------------- LOGIN REQUESTS ----------------
    case types.LOGIN_STUDENT_REQUEST:
    case types.LOGIN_TEACHER_REQUEST:
    case types.LOGIN_ADMIN_REQUEST:
      return { ...state, userLogin: { loading: true, error: false } };

    // ---------------- LOGIN SUCCESS ----------------
    case types.LOGIN_STUDENT_SUCCESS:
    case types.LOGIN_TEACHER_SUCCESS:
    case types.LOGIN_ADMIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        userLogin: { loading: false, error: false, message: payload.message },
        data: {
          isAuthenticated: !!payload.token,
          token: payload.token,
          user: payload.user,
        },
      };

    // ---------------- LOGIN ERRORS ----------------
    case types.LOGIN_STUDENT_ERROR:
    case types.LOGIN_TEACHER_ERROR:
    case types.LOGIN_ADMIN_ERROR:
      return { ...state, userLogin: { loading: false, error: true, message: payload.message } };

    // ---------------- UPDATE SUCCESS ----------------
    case types.EDIT_STUDENT_SUCCESS:
    case types.EDIT_TEACHER_SUCCESS:
      return {
        ...state,
        data: { ...state.data, user: payload },
      };

    // ---------------- RESET LOGIN STATE ----------------
    case "AUTH_LOGIN_RESET":
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
      };

    // ---------------- LOGOUT ----------------
    case types.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        userLogin: { loading: false, error: false, message: "" },
        userLogout: { message: "Logout Successfully" },
        data: { isAuthenticated: false, token: null, user: null },
      };

    default:
      return state;
  }
}

// -------------------- TEACHERS REDUCER --------------------
const initialTeacherState = {
  teachers: [],
  loading: false,
  error: null,
};

export const teachersReducer = (state = initialTeacherState, action) => {
  switch (action.type) {
    case "FETCH_TEACHERS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_TEACHERS_SUCCESS":
      return { ...state, loading: false, teachers: action.payload };
    case "FETCH_TEACHERS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
