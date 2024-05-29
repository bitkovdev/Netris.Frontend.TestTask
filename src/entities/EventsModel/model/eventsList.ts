import { restore } from "effector"
import { fetchGetEventsList } from "shared/api"
import { sharedLibHelper } from "shared/lib"

export const $EventsList = restore(fetchGetEventsList.doneData, []).map(
  element =>
    element.map(item => ({
      time_code: sharedLibHelper.TimestampToTimeCode(item.timestamp),
      timestamp: item.timestamp,
      timestamp_end: item.timestamp + item.duration,
      duration: item.duration,
      zone: item.zone,
    })),
)
