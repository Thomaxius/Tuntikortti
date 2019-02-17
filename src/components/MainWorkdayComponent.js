import WorkHourTable from './WorkdayTableComponent'
import AddWorkday from './AddWorkdayComponent'
import SumTable from './WorkdaySumComponent'
import React from 'react'
import moment from 'moment'
import utils from "../utils"
const axios = require("axios")

class MainWorkdayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddWorkday = this.handleAddWorkday.bind(this)
    this.workdayIsValid = this.workdayIsValid.bind(this)
    this.deleteWorkday = this.deleteWorkday.bind(this)
    this.state = {
      workdays: [],
      error: ""
    }
  }

  deleteWorkday = (id) => { // This is called from table component and allows one to delete a workday from the table.
    this.state.workdays.splice(id, 1)
    localStorage.setItem("workdays", JSON.stringify(utils.deepCopy(this.state.workdays)))
  }

  async handleAddWorkday(workdayObj) {

    // Sort workdays by begin date
    const workdaysJoinedAndSorted = this.state.workdays.concat([workdayObj]).sort((a, b) => {
      return a.workday_date_begin - b.workday_date_begin
    })
    this.setState(() => {
      return {
        workdays: workdaysJoinedAndSorted
      }
    })
    localStorage.setItem("workdays", JSON.stringify(utils.deepCopy(workdaysJoinedAndSorted))) // LocalStorage only supports strings
    return true
  }

  async workdayIsValid(workdayObj) { // Called after user adds a new workday to punchcard
    let resultObj = {}
    await axios.post(`http://localhost:3000/checkforoverlap`, // Check if there is a workday in the database that overlaps with this newly-added workday
      {
        params: {
          workday: workdayObj
        }
      }).then((result) => {
        if (result.status === 200) {
          const errorObj = utils.workdayOverlaps(this.state.workdays, workdayObj)
          if (errorObj.error) { // If workday overlaps with existing workdays in the state\local storage, that haven't been added to the database yet
             resultObj = { error: true, message: "Työvuorossa on päällekäisyyksiä jo lisätyn työvuoron tai työvuorojen kanssa." }
          }
          else {
            resultObj = { error: false, message: null }
          }
          }
      }).catch((error) => { // If server side validation fails, or if server doesn't respond
        if (error) {
          if (!error.response) {
            resultObj = { error: true, message: "Tuntematon virhe." }
          }
          else if (error.response.status === 400) { // Server returns 400 if there is an overlapping workday in the database
            if (error.response.data) {
              resultObj = { error: true, message: `Tietokannasta löytyi jo olemassa oleva työvuoro tai työvuoroja annetuilla ajoilla. Päällekäinen työvuoro: ${moment(error.response.data.workday_date_begin).format("YYYY-MM-DD HH:mm")}-${moment(error.response.data.workday_date_end).format("YYYY-MM-DD HH:mm")}` }
            }
            else {
              resultObj = { error: true, message: 'LETHAL FATAL ERROR. TERMINATING IMMEDIATELY.' }
            }
          }
          else if (error.response.status === 500) {
            resultObj = { error: true, message: "Palvelinvirhe." }
          }
        }
      })
    return resultObj
  }

  componentDidMount() {

    if (localStorage['workdays'] !== undefined) {
      this.setState({ workdays: JSON.parse(localStorage.workdays) }) // Convert the "array of objects as string" back to an array of object
    }
  }

  clearState = () => {
    this.setState({ workdays: [] })
    localStorage.clear()
  }

  addWorkdaysToDb = () => {
    const workday_amount = this.state.workdays.length
    axios.post(`http://localhost:3000/addworkdays`, // Check if there is a workday in the database that overlaps with this newly-added workday
    {
      params: {
        workdays: this.state.workdays
      }
    }).then((result) => {
      if (result.status === 200) {
        console.log(result)
        alert(workday_amount + ' työpäivää lisätty tietokantaan.')
        this.clearState()
      }
    }).catch((error) => {
      if (error) {
        if (!error.response) {
          alert("Tuntematon virhe.")
          return false
        }
        else if (error.response.status === 500) {
          alert("Palvelinvirhe.")
          return false
        }
        else {
          alert("Tuntematon virhe.")
      }
    } 
  })
}

  render() {
    return (
      <div>
        <WorkHourTable deleteWorkday={this.deleteWorkday} data={this.state.workdays} handleAddWorkday={this.handleAddWorkday} />
        <br />
        <SumTable workdays={this.state.workdays} />
        <AddWorkday workdayIsValid={this.workdayIsValid} handleAddWorkday={this.handleAddWorkday} isValidWorkStartTime={this.isValidWorkStartTime} />
        <button disabled={(this.state.workdays && this.state.workdays.length === 0) && true} onClick={this.addWorkdaysToDb}>Lisää työpäivät tietokantaan</button>
        <button disabled={(this.state.workdays && this.state.workdays.length === 0) && true} onClick={this.clearState}>Tyhjennä tuntikortti</button>
      </div>
    )
  }
}

export default MainWorkdayComponent
