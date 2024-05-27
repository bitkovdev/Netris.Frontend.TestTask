import { restore } from "effector"
import { fetchGetEventsList } from "shared/api"
import { sharedLibHelper } from "shared/lib"

export const $EventsList = restore(fetchGetEventsList.doneData, []).map(
  element =>
    element.map(item => ({
      time_code: sharedLibHelper.TimestampToTimeCode(item.timestamp),
      timestamp: item.timestamp,
      duration: item.duration,
      zone: {
        // converting pixels to percentages for layout on canvas
        left: (item.zone.left / 1280) * 100,
        top: (item.zone.top / 720) * 100,
        width: item.zone.width,
        height: item.zone.height,
      },
    })),
)
