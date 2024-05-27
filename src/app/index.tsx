import "./styles/index.scss"
import { MainPage } from "pages/MainPage"
import { LogoSVG } from "shared/svg/logo"

const App = () => {
  return (
    <div className="wrapper">
      <MainPage />
      <div className="logo">
        <LogoSVG />
      </div>
    </div>
  )
}

export default App
