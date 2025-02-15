import { useTestMode } from "../Context/TesModeContext"


function UpperMenu({countDown}) {

  const{setTestTime} = useTestMode()

  const updateTime = (e)=>{
    setTestTime(Number(e.target.id))
  }

    return(
      <div className="upper-menu">
        <div className="counter">
            {countDown}
        </div>
        <div className="modes">
            <div className="time-mode" onClick={updateTime} id={15}>15s</div>
            <div className="time-mode" onClick={updateTime} id={30}>30s</div>
            <div className="time-mode" onClick={updateTime} id={60}>60s</div>
        </div>
      </div>
    )
  }
  
  export default UpperMenu