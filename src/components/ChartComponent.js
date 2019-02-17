
import React from 'react'
import LineChart from '../chart'
import axios from 'axios'
import utils from "../utils"
import moment from 'moment'



const WorkdaysAndTohoilytchart = (state) => {
  const dataArrObj = state.workdayChartData
  const dates = dataArrObj.map(x => moment(x.date).format('DD-MM-YY'))
  const workday_length = dataArrObj.map(x => x.workday_length.toFixed(2))
  const tohoilyt = dataArrObj.map(x => x.tohoilyt)
  const sleep = dataArrObj.map((x) => x.sleep_amount.toFixed(2))
  const columns = [['x', ...dates], ['Työpäivän pituus', ...workday_length], ['Töhöilyt', ...tohoilyt], ['Unen määrä', ...sleep]]
  const data = {
    x: "x",
    columns,
  }
  const axis = {
    x: {
      label: "PVM",
      type: "timeseries",
      tick: { format: "%y-%m-%d" }
    },
    y: {
      label: "Työtunnit",
    },
  }
  const size = {
    height: 440,
    width: 680,
  }
  const grid = {
    y: {
      lines: [
        { value: 10, text: "8h" },
        { value: 5, text: "5h" },
      ]
    }
  }

  if (state.loading) {
    return <div>Haetaan tietoja..</div>
  }
  else {
    return (
      <div className="chart">
        <LineChart size={size} data={data} axis={axis} grid={grid} line={{ connectNull: true }} />
      </div>
    )
  }
}

const nutrietsAndRandomChart = (state) => {
  if (state.randomChartdata.length === 0 || state.loading) {
    if (state.loading) {
      return <div>Haetaan tietoja..</div>
    }
  }

  const randomData = state.randomChartdata
  const workdayData = state.workdayChartData
  const dates = randomData.map(x => moment(x.date).format('DD-MM-YY'))
  const carbohydrates = randomData.map(x => (x.carbohydrates / 10).toFixed(2))
  const steps = randomData.map(x => (x.steps / 1000).toFixed(2))
  const calories = randomData.map(x => (x.calories / 100).toFixed(2))
  const sugars = randomData.map(x => (x.sugars / 10).toFixed(2))
  const proteins = randomData.map(x => (x.proteins / 10).toFixed(2))
  const workdayLength = randomData.map(x => (x.workday_length).toFixed(2))
  const tohoilyt = randomData.map((randomObj) => workdayData.find((workdayObj) => workdayObj.date === randomObj.date)).map((workdayObj) => workdayObj.tohoilyt) // Find töhoilyt only for the days where there are workdays
  const sleep = workdayData.map((x) => (x.sleep_amount).toFixed(2))
  const columns = [
    ['x', ...dates], ['Työpäivän pituus (h)', ...workdayLength], ['Unen määrä (h)', ...sleep], ['Hiilihydraatit (/100)', ...carbohydrates],
    ['Askeleet (/1000)', ...steps], ['Kalorit (/100)', ...calories], ['Sokerit (/10)', ...sugars], ['Proteiinit (/10)', ...proteins], ['Töhöilyt', ...tohoilyt],
  ]
  const data = {
    x: 'x',
    columns,
    types: {
      'Työpäivän pituus (h)': 'bar',
      'Unen määrä (h)': 'bar',
      'Hiilihydraatit (/100)': 'bar',
      'Askeleet (/1000)': 'bar',
      'Kalorit (/100)': 'bar',
      'Sokerit (/10)': 'bar',
      'Proteiinit (/10)': 'bar',
      'Töhöilyt': 'area-spline',
    },
    groups: [
      ['Työpäivän pituus (h)', 'Unen määrä (h)', 'Hiilihydraatit (/100)', 'Askeleet (/1000)', 'Kalorit (/100)', 'Sokerit (/10)', 'Proteiinit (/10)', 'Töhöilyt']
    ],
    order: 'desc'

  }

  const size = {
    height: 440,
    width: 680,
  }

  const legend = {
    show: true
  }

  const axis = {
    x: {
      type: 'timeseries',
      tick: { format: "%y-%m-%d" }
    }
  }


  return (
    <div className="chart">
      <LineChart size={size} legend={legend} data={data} axis={axis} />
    </div>
  )
}

const WeeklyAverageWorkdaysChart = (state) => {
  const swap = (arr, a, b) => arr.map((it, idx) => (idx === a) ? arr[b] : (idx === b) ? arr[a] : it)

  const dataArrObj = state.weeklyAverageChart
  let avgHours = dataArrObj.map(x => x.avg_workhours.toFixed(2))
  let avgTasks = dataArrObj.map(x => x.avg_tasks.toFixed(2))
  let avgSleep = dataArrObj.map((x) => x.avg_sleep.toFixed(2))
  if (avgHours.length == 7 && avgTasks.length == 7 && avgSleep.length == 7) {
    avgHours = swap(avgHours, 0, 6)
    avgTasks = swap(avgTasks, 0, 6)
    avgSleep = swap(avgSleep, 0, 6)
  }
  const columns = [['Viikonpäivä', "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"], ['Työpäivän pituus (h)', ...avgHours], ['Työtehtävät (kpl)', ...avgTasks], ['Unen määrä (h)', ...avgSleep]]
  const data = {
    x: "Viikonpäivä",
    columns,
    types: {
      'Työpäivän pituus (h)': 'bar',
      'Unen määrä (h)': 'spline',
      'Työtehtävät (kpl)': 'bar',
    },
  }
  const axis = {
    x: {
      label: "PVM",
      type: "category",
    },
    y: {
      label: "Työtunnit",
    },
  }
  const size = {
    height: 440,
    width: 680,
  }

  if (state.loading) {
    return <div>Haetaan tietoja..</div>
  }
  else {
    return (
      <div className="chart">
        <LineChart size={size} data={data} axis={axis} line={{ connectNull: true }} />
      </div>
    )
  }
}

class ChartComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    const date = new Date()
    const date2 = new Date()
    date.setFullYear(2018)
    this.state = {
      randomChartdata: [],
      workdayChartData: [],
      weeklyAverageChart: [],
      loading: true,
      startDate: new Date(date.getFullYear(), date.getMonth(), 1), // Upon first loading the page, we will fetch data for chart from a year range
      endDate: new Date(date2.getFullYear(), date2.getMonth() + 1, 0),
      tempStartDate: new Date(date.getFullYear(), date.getMonth(), 1),
      tempEndDate: new Date(date2.getFullYear(), date2.getMonth() + 1, 0)      
    }
  }

  async getDataForWorkdayChart() { // Get data for charts
    this.setState({ loading: true })
    await axios.post(`${window.location.protocol}${window.location.hostname}:${window.location.port}/getworkdaychartdata`,
      {
        params: {
          startDate: this.state.startDate, // These are eithe user-supplied, or pre-defined by default
          endDate: this.state.endDate
        }
      }).then((data) => {
        this.setState({ workdayChartData: data.data, loading: false })
      })
  }

  async getDataForRandomChart() { // Get data for chart2
    this.setState({ loading: true })
    await axios.post(`${window.location.protocol}${window.location.hostname}:${window.location.port}/getrandomchartdata`,
      {
        params: {
          startDate: this.state.startDate, // These are eithe user-supplied, or pre-defined by default
          endDate: this.state.endDate
        }
      }).then((data) => {
        this.setState({ randomChartdata: data.data, loading: false })
      })
  }

  async getDataForAverageChart() { // Get data for chart2
    this.setState({ loading: true })
    await axios.post(`${window.location.protocol}${window.location.hostname}:${window.location.port}/getaveragechart`,
      {
        params: {
          startDate: this.state.startDate, // These are either user-supplied, or pre-defined by default
          endDate: this.state.endDate
        }
      }).then((data) => {
        this.setState({ weeklyAverageChart: data.data, loading: false })
      })
  }


  async componentDidMount() {
    await this.getDataForWorkdayChart()
    await this.getDataForRandomChart()
    await this.getDataForAverageChart()
  }

  handleChangeStartDate(e) { moment(e.target.value).isValid() && this.setState({ tempStartDate: new Date(e.target.value), error: '' }) }
  handleChangeEndDate(e) { moment(e.target.value).isValid() && this.setState({ tempEndDate: new Date(e.target.value), error: '' }) }
  validateDate = async () => {
    if (!utils.datesAreValid(this.state.tempStartDate, this.state.tempEndDate) || utils.date1IsAfterDate2(this.state.tempStartDate, this.state.tempEndDate)) {  // User tries to enter a search string end date that is after begin string
      this.setState({ 'error': 'Tarkista aloitus- ja lopetusajat.' })
      return false
    }
    else { // If everything is OK, we search data with new user-supplied dates
      this.setState({startDate: new Date(this.state.tempStartDate), endDate: new Date(this.state.tempEndDate), error: '' })
      await this.getDataForRandomChart()
      await this.getDataForWorkdayChart()
      await this.getDataForAverageChart()
    }
  }

  render() {
    return (
      <div className="content">
        <br />
        <p style={{"fontWeight": "bold"}}>Syötä aikaväli..</p>
        Alkupvm
        <br />
        <input type="date" onBlur={() => this.validateDate()} onChange={this.handleChangeStartDate} value={moment(this.state.tempStartDate).format('YYYY-MM-DD')}></input><br />
        <br />
        Loppupvm
        <br />
        <input type="date" onBlur={() => this.validateDate()} onChange={this.handleChangeEndDate} value={moment(this.state.tempEndDate).format('YYYY-MM-DD')}></input><br />
        {this.state.error && <div className="error">{this.state.error}</div>}
        <br />
        <br />
        <p style={{"fontWeight": "bold"}}>{(moment(this.state.startDate).isValid() && moment(this.state.endDate).isValid()) && `Aikavälillä ${moment(this.state.startDate).format('YYYY-MM-DD')} - ${moment(this.state.endDate).format('YYYY-MM-DD')}`}</p>
        <div>{(this.state.workdayChartData.length === 0 || this.state.randomChartdata.length === 0 || this.state.weeklyAverageChart.length === 0) && "Ei näytettää dataa annetuilla päivillä. "}</div>
        <b>Työpäivät ja töhöilyt</b>
        <br />
        <br />
        <div>{WorkdaysAndTohoilytchart(this.state)}</div>
        <b>Päivittäinen keskiarvo</b>
        <br />
        <br />
        <div>{WeeklyAverageWorkdaysChart(this.state)}</div>
        <b>Ravinto & Unen määrä & töhöilyt</b>
        <br />
        <br />
        <div>{nutrietsAndRandomChart(this.state)}</div>
        <br />
        {this.state.error && <div className="error">{this.state.error}</div>}
      </div>
    )
  }
}

export default ChartComponent


