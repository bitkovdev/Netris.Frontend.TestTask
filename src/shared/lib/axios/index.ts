import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import { sharedConfigEnv } from "shared/config"

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${sharedConfigEnv.API_ROOT}`,
  timeout: 120000,
})

const errorHandler = (error: AxiosError) => {
  return Promise.reject(error?.response?.data)
}

const resHandler = (response: AxiosResponse) => {
  const { data } = response

  return Promise.resolve(data)
}

const reqHandler = (config: InternalAxiosRequestConfig) => {
  return config
}

axiosInstance.interceptors.request.use(reqHandler)
axiosInstance.interceptors.response.use(resHandler, errorHandler)

export default axiosInstance
