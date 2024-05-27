import styles from "./MainPage.module.scss"

export const MainPage = () => {
  return (
    <div className={styles.pageContainer}>
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        controls
        className={styles.videoPlayer}
      />
      <div className={styles.eventsContainer}>
        <h2>Список событий:</h2>
        <div className={styles.eventsButtons}>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
          <button>23:03:23</button>
        </div>
      </div>
    </div>
  )
}
