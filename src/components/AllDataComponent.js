
import React from 'react'
import AllDataTable from './AllDataTable'
import moment from 'moment'
import utils from "../utils"
import SumAllData from "./SumAllData"
const axios = require("axios")

export default class AllDataComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
        const date = new Date()
        this.state = {
            workdaysAndTohoilyt: [],
            sumOfTasks: [],
            loading:true,
            startDate: new Date(date.getFullYear(), date.getMonth(), 1), // By default, we search workdays from current month only
            endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
        }
      }
      
      async getData() { // Fetch initial data
        this.setState({loading:true})
        await axios.post(`${window.location.protocol}${window.location.hostname}:${window.location.port}/getalldata`, 
        {
          params: {
            startDate: this.state.startDate,
            endDate: this.state.endDate
          }
    }).then(async (response) => {
        this.setState({workdaysAndTohoilyt: response.data.workdaysAndTohoilyt, sumOfTasks: response.data.totalSumOfTasks, loading:false})
    })
    }

    async componentDidMount() {
        await this.getData()
    }    

    handleChangeStartDate(e) {moment(e.target.value).isValid() && this.setState({startDate: new Date(e.target.value), error:''})} // Called when user types a date into date input field
    handleChangeEndDate(e) {moment(e.target.value).isValid() && this.setState({endDate: new Date(e.target.value), error:''})}
    validateDate = () => {
      if (utils.datesAreValid(this.state.startDate, this.state.endDate)) {
        if (utils.date1IsAfterDate2(this.state.startDate, this.state.endDate)) {
          this.setState({'error': 'Tarkista aloitus- ja lopetusajat.'}) // User tries to enter a search string end date that is after begin string
          return false 
        }
        else { // If everything is OK, we search data with new user-supplied dates
          this.getData()
        }
      }
    }
    render() {
        if (this.state.loading) {
            return <div>loading..</div>
        }
        return (
            <div className="content">
            <div>{(!this.state.workdaysAndTohoilyt || this.state.workdaysAndTohoilyt.length === 0) ? "Ei näytettäviä työpäiviä annetuilla päivillä." : (this.state.startDate && this.state.endDate) && 
            <b>Työpäivät {moment(this.state.startDate).format('ddd YYYY.MM.DD')} - {moment(this.state.endDate).format('ddd YYYY.MM.DD')}</b>}</div>
            <br/>
            Anna aikaväli..<br/>
            Alkupvm
            <br/>
            <input type="date" onBlur={() => this.validateDate()} onChange={this.handleChangeStartDate} value={moment(this.state.startDate).format('YYYY-MM-DD')}></input><br/>
            Loppupvm
            <br/>
            <input type="date" onBlur={() => this.validateDate()} onChange={this.handleChangeEndDate} value={moment(this.state.endDate).format('YYYY-MM-DD')}></input><br/>
            {this.state.error && <div className="error">{this.state.error}</div>}
            <AllDataTable data={this.state.workdaysAndTohoilyt} />
            <br/>
            <br/>
            <SumAllData data={this.state.sumOfTasks} />
            </div>
        )
      }

}