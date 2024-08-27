import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../../Firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// thunk for register of user
export const registerUser = createAsyncThunk(
  "authSlice/register",
  async ({ email, password, userName, accountType }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      localStorage.setItem('token', user.accessToken);
      //add additional dada to firestore

      await setDoc(doc(firestore, "users", user.uid), {
        userName,
        email,
        accountType,
      });

      return { uid: user.uid, email, userName, accountType };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// thunk thunk  ton login user and fetch there data

export const loginUser = createAsyncThunk(
  "authSlice/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const { user } = userCredential;
      localStorage.setItem('token', user.accessToken);
    

      //fetch additonal user data from firestore
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { uid: user.uid, email: user.email, ...userData };
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// fetch additional information of user
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (uid, thunkAPI) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { uid:uid,...userData };
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated=false;
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      // thunk to register new user

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated=true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // thunk to login and fetch user and data
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated=true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle fetchUserData thunk
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
