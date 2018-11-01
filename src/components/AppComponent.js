import WorkHourTable from './TableComponent'
import AddWorkday from './AddWorkdayComponent'
import SumTable from './SumComponent'
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
          workdays: prevState.workdays.concat([workdayObj]).sort((a,b) => {
            return a.workday_date_begin - b.workday_date_begin
          } // Sort workdays by begin date
        )
        }
      }
    )
  }



  isValidWorkStartTime(newWorkday) {
    if (this.state.workdays.length === 0) {
      return true
    }

    for (let item of this.state.workdays) {
      const workdayBeginsBeforeComparedBegins = (moment(newWorkday.workday_date_begin).diff(moment(item.workday_date_begin), true) < 0)
      const workdayBeginsBeforeComparedEnds = (moment(newWorkday.workday_date_begin).diff(moment(item.workday_date_end), true) < 0)
      const workdayEndsBeforeComparedBegins = (moment(newWorkday.workday_date_end).diff(moment(item.workday_date_begin), true) < 0)
      const workdayEndsBeforeComparedEnds = (moment(newWorkday.workday_date_end).diff(moment(item.workday_date_end), true) < 0)

      // Don't laugh, I was bashing my head in because of these
      const condition1 = (workdayBeginsBeforeComparedBegins && workdayBeginsBeforeComparedEnds && workdayEndsBeforeComparedBegins && workdayEndsBeforeComparedEnds) 
      const condition2 = (!workdayBeginsBeforeComparedBegins && !workdayBeginsBeforeComparedEnds && !workdayEndsBeforeComparedBegins && !workdayEndsBeforeComparedEnds)
      if (!condition1 && !condition2) {
        return false
      }
    }


    return true

  }
    
    render() {
      return (
          <div>
            <WorkHourTable data={this.state.workdays} handleAddWorkday={this.handleAddWorkday}/>
            <br/>
            <SumTable workdays={this.state.workdays}/>
            <AddWorkday handleAddWorkday={this.handleAddWorkday} isValidWorkStartTime={this.isValidWorkStartTime} />
          </div>
      )
    }
  }

  export default AppComponent;
