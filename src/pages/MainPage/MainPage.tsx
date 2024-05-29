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

      // Click handler for play video
      const playVideo = async () => {
        if (video.paused) {
          await video.play()
          canvas.removeEventListener("click", playVideo)
          canvas.addEventListener("click", pauseVideo)
        }
      }

      // Click handler for pause video
      const pauseVideo = () => {
        if (!video.paused) {
          video.pause()
          canvas.removeEventListener("click", pauseVideo)
          canvas.addEventListener("click", playVideo)
        }
      }

      canvas.addEventListener("click", playVideo)

      if (ctx) {
        video.addEventListener("play", function () {
          // I couldn’t think of another way to live broadcast from a video tag. So I had to ignore eslint at this point.
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const $this = this // cache
          ;(function loop() {
            if (!$this.paused && !$this.ended) {
              ctx.drawImage($this, 0, 0)
              if (eventsList) {
                eventsList.map(item => {
                  if (
                    $this.currentTime >= item.timestamp &&
                    $this.currentTime <= item.timestamp_end
                  ) {
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
              setInterval(loop, 1000 / 24) // drawing at 24fps
            }
          })()
        })
      }
    }
  }, [canvasRef, videoRef, eventsList])

  const setTimestamp = async (timestamp: number) => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        video.currentTime = timestamp
        // If the video is paused, the handler below will change the current freeze-frame
        if (video.paused) {
          video.ontimeupdate = () => {
            ctx.drawImage(video, 0, 0)
            eventsList.map(item => {
              if (
                timestamp >= item.timestamp &&
                timestamp <= item.timestamp_end
              ) {
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
    }
  }

  return (
    <div className={styles.pageContainer}>
      <canvas ref={canvasRef} className={styles.videoPlayer} />
      <video ref={videoRef} src={VIDEO_ROOT} muted hidden />
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
