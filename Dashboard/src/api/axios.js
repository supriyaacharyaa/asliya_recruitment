// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("user");
    const token = stored ? JSON.parse(stored)?.token : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Malformed/missing storage — let the request go out unauthenticated
    // rather than throwing inside the interceptor.
  }

  return config;
});

export default instance;