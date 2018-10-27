import Table from './TableComponent'
import AddWorkday from './AddWorkdayComponent'
import React from 'react'
import moment from 'moment';


class AppComponent extends React.Component {
    constructor(props) {
      super(props)
      this.handleAddWorkday = this.handleAddWorkday.bind(this)
      this.isValidWorkStartTime = this.isValidWorkStartTime.bind(this)
      this.state = {
        workdays: [],
      }
    }

    handleAddWorkday(workdayObj) {
      this.setState((prevState) => {
        return {
          workdays: prevState.workdays.concat([workdayObj])
        }
      
      })
    }

    isValidWorkStartTime(workdayBeginDateObj) {
      if (this.state.workdays.length === 0) {
        return true
      }

      let previousWorkdayObj = this.state.workdays[this.state.workdays.length-1]
      if (moment(workdayBeginDateObj).diff(moment(previousWorkdayObj.workday_date_end_obj), true) < 0) {
        return false
      }
      else {
        return true
      }
    }
    
    render() {
      return (
          <div>
            <Table data={this.state.workdays} handleAddWorkday={this.handleAddWorkday}/>
            <AddWorkday handleAddWorkday={this.handleAddWorkday} isValidWorkStartTime={this.isValidWorkStartTime} />
          </div>
      )
    }
  }

  export default AppComponent;
