import axios from "restyped-axios";
import { API_PATH, MyApi } from "../../shared/types/api";

const api = axios.create<MyApi>({ baseURL: API_PATH });

export default api;