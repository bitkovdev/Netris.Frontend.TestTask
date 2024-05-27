import styles from "./MainPage.module.scss"
import { useEffect } from "react"
import { fetchGetEventsList } from "shared/api"
import { useUnit } from "effector-react"
import { $EventsList } from "entities/EventsModel/model"
import { VIDEO_ROOT } from "shared/config/env"

export const MainPage = () => {
  const eventsList = useUnit($EventsList)

  useEffect(() => {
    fetchGetEventsList({})
  }, [])

  return (
    <div className={styles.pageContainer}>
      <video src={VIDEO_ROOT} controls className={styles.videoPlayer} />
      <div className={styles.eventsContainer}>
        <h2>Список событий:</h2>
        <div className={styles.eventsButtons}>
          {eventsList.map(item => (
            <button key={item.timestamp}>{item.time_code}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
