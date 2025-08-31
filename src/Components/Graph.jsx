import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LinearScale
} from "chart.js"
import { Line } from "react-chartjs-2"
import { useTheme } from "../Context/ThemeContext"
ChartJS.register(
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LinearScale
)

const Graph  = ({graphData}) => {  

    const {theme} = useTheme()
    return (
      <>
        <Line
            data={
                {
                    labels : graphData.map(i=>i[0]),
                    datasets: [
                        {
                            data: graphData.map(i=>i[1]),
                            label: 'wpm',
                            borderColor: theme.textColor
                        }
                    ]
                }
            }
        />
      </>
    )
  }
  
  export default Graph  