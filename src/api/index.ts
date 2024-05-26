import axios from "axios";
import { JobPost } from "../type/const";

export const fetchJobPosts = async () => {
  try {
    const response = await axios.get("/api/gamzaApi/v1/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export const addJobPost = async (newJob: JobPost) => {
  try {
    await axios.post("/api/gamzaApi/v1/add", newJob, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding job post:", error);
    throw error;
  }
};
