import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../Api/api";

export const submitTask = createAsyncThunk("submission/submitTask",
  async ({ taskId, githubLink }) => {
    setAuthHeader(localStorage.getItem("jwt", api))
    try {
      const { data } = await api.post(`/api/submissions?task_id=${taskId}&github_link=${githubLink}`, {})
      console.log("submit task---", data)
      return data;
    } catch (error) {
      console.log("submit task---", error)
      throw Error(error.response.data.error)
    }
  })


export const fetchAllSubmissions = createAsyncThunk("submission/fetchAllSubmissions",
  async () => {
    setAuthHeader(localStorage.getItem("jwt", api))
    try {
      const { data } = await api.get(`/api/submissions`)
      console.log("fetchAllSubmissions ---", data)
      return data;
    } catch (error) {
      console.log("fetchAllSubmissions ---", error)
      throw Error(error.response.data.error)
    }
  })



export const fetchSubmissionsByTaskId = createAsyncThunk("submission/fetchSubmissionsByTaskId",
  async (taskId) => {
    setAuthHeader(localStorage.getItem("jwt", api))
    try {
      const { data } = await api.get(`/api/submissions/${taskId}`)
      console.log("fetchSubmissionsByTaskId ---", data)
      return data;
    } catch (error) {
      console.log("fetchSubmissionsByTaskId ---", error)
      throw Error(error.response.data.error)
    }
  })

export const fetchAllSubmissionsByTaskId = createAsyncThunk("submission/fetchAllSubmissionsByTaskId",
  async (taskId) => {
    setAuthHeader(localStorage.getItem("jwt", api))
    try {
      const { data } = await api.get(`/api/submissions/task/${taskId}`)
      console.log("fetch All SubmissionsByTaskId ---", data)
      return data;
    } catch (error) {
      console.log("fetch All SubmissionsByTaskId ---", error)
      throw Error(error.response.data.error)
    }
  })

export const acceptDeclinedSubmission = createAsyncThunk("submission/acceptDeclinedSubmission",
  async ({ taskId, status }) => {
    setAuthHeader(localStorage.getItem("jwt", api))
    try {
      const { data } = await api.put(`/api/submissions/${taskId}?status=${status}`)
      console.log("acceptDeclinedSubmission ---", data)
      return data;
    } catch (error) {
      console.log("acceptDeclinedSubmission ---", error)
      throw Error(error.response.data.error)
    }
  })


const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    submissions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTask.pending, (state) => {
        state.status = "loading"
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions.push(action.payload)
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      })

      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = action.payload
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      })

      .addCase(fetchAllSubmissionsByTaskId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = action.payload
      })
      .addCase(fetchAllSubmissionsByTaskId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      })

      .addCase(fetchSubmissionsByTaskId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = action.payload
      })

      .addCase(acceptDeclinedSubmission.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = state.submissions.map((item) =>
          item.id !== action.payload.id ? item : action.payload)
      })


  }
})

export default submissionSlice.reducer