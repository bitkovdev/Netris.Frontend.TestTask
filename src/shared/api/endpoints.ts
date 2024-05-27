import { createEffect } from "effector"
import axiosInstance from "shared/lib/axios"
import { RequestFetchGetEventsList, ResponseFetchGetEventsList } from "./types"

export const fetchGetEventsList = createEffect<
  RequestFetchGetEventsList,
  ResponseFetchGetEventsList[]
>(async () => {
  return await axiosInstance.get(`/86ba5ad4-c45e-4f3d-9a07-83ce9a345833`)
})
