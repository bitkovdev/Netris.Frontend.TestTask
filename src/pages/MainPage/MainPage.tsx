import styles from "./MainPage.module.scss"
import React, { useEffect, useRef } from "react"
import { fetchGetEventsList } from "shared/api"
import { useUnit } from "effector-react"
import { $EventsList } from "entities/EventsModel/model"
import { VIDEO_ROOT } from "shared/config/env"

export const MainPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const eventsList = useUnit($EventsList)

  useEffect(() => {
    fetchGetEventsList({})
  }, [])

  useEffect(() => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      // Setting canvas size
      video.addEventListener("loadedmetadata", function () {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      })

      if (ctx) {
        const createRectangles = (createdItemsArray: number[]) => {
          eventsList.map(item => {
            if (item) {
              if (!createdItemsArray.includes(item.timestamp)) {
                if (
                  video.currentTime >= item.timestamp &&
                  video.currentTime <= item.timestamp_end
                ) {
                  createdItemsArray = [item.timestamp, ...createdItemsArray]
                  ctx.fillStyle = "green"
                  ctx.fillRect(
                    item.zone.left,
                    item.zone.top,
                    item.zone.width,
                    item.zone.height,
                  )
                }
              }
              if (video.currentTime >= item.timestamp_end) {
                ctx.clearRect(
                  item.zone.left,
                  item.zone.top,
                  item.zone.width,
                  item.zone.height,
                )
              }
            }
          })
        }

        video.addEventListener("timeupdate", () => createRectangles([]))

        // Click handler for play video
        const playVideo = async () => {
          if (video.paused) {
            await video.play()
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            canvas.removeEventListener("click", playVideo)
            canvas.addEventListener("click", pauseVideo)
          }
        }

        // Click handler for pause video
        const pauseVideo = () => {
          if (!video.paused) {
            video.pause()
            video.removeEventListener("timeupdate", () => createRectangles([]))
            eventsList.map(item => {
              if (item) {
                if (
                  video.currentTime >= item.timestamp &&
                  video.currentTime <= item.timestamp_end
                ) {
                  ctx.fillStyle = "green"
                  ctx.fillRect(
                    item.zone.left,
                    item.zone.top,
                    item.zone.width,
                    item.zone.height,
                  )
                }
              }
            })
            canvas.removeEventListener("click", pauseVideo)
            canvas.addEventListener("click", playVideo)
          }
        }

        canvas.addEventListener("click", playVideo)
      }
    }
  }, [canvasRef, videoRef, eventsList])

  const setTimestamp = async (timestamp: number) => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        video.currentTime = timestamp
        eventsList.map(item => {
          if (timestamp >= item.timestamp && timestamp <= item.timestamp_end) {
            ctx.fillStyle = "green"
            ctx.fillRect(
              item.zone.left,
              item.zone.top,
              item.zone.width,
              item.zone.height,
            )
          }
        })
      }
    }
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.videoContainer}>
        <canvas ref={canvasRef} />
        <video ref={videoRef} src={VIDEO_ROOT} muted />
      </div>
      <div className={styles.eventsContainer}>
        <h2>Список событий:</h2>
        <div className={styles.eventsButtons}>
          {eventsList.map(item => (
            <button
              onClick={() => setTimestamp(item.timestamp)}
              key={item.timestamp}
            >
              {item.time_code}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
