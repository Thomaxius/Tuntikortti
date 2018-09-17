import React from 'react';
import moment from 'moment';


const getDateDifferenceInHours = (earlierDate, laterDate) => {
    let difference = moment(laterDate).diff(moment(earlierDate), 'hours', true).toFixed(2)
    if (difference < 0) { // If workday end date is in the next day
      difference = moment(earlierDate).diff(moment(laterDate), 'hours', true).toFixed(2)
    }
    return difference
  }
const getStringWithTwoDates = (date1Obj, date2Obj) => ("0" + date1Obj.getDate()).slice(-2) + '-' + ("0" + date2Obj.getDate()).slice(-2) + '.' + ("0" + (parseInt(date2Obj.getMonth())+1)).slice(-2)
const endHoursAreInNextDay = (earlierHHmmString, laterHHmmString) => (parseInt(earlierHHmmString.replace(':','')) > parseInt(laterHHmmString.replace(':','')))

class AddWorkday extends React.Component {
    constructor(props) {
      super(props)
      this.handleAddWorkday = this.handleAddWorkday.bind(this)
      this.handleChange_date = this.handleChange_date.bind(this)
      this.handleChange_workhours_begin = this.handleChange_workhours_begin.bind(this)
      this.handleChange_workhours_end = this.handleChange_workhours_end.bind(this)
      this.validateDate = this.validateDate.bind(this)
      this.validateBeginHours = this.validateBeginHours.bind(this)    
      this.validateEndHours = this.validateEndHours.bind(this)
      this.state = {
        inputValue_date: "",
        workday_begin_tod: "",
        workday_end_tod: "",
        error_date: "",
        error_workhours: "",
        workday_date_begin: "",
        workday_date_end: "",
        workday_total_hours: "",
      }
    }
  
    handleAddWorkday(e) {
      e.preventDefault();
      if (!this.props.isValidWorkStartTime(this.state.workday_date_begin)) {
        console.log(this.state.workday_date_begin)
        this.setState(() => {
          return {
          error: "Työvuoron aloitusaika on ennen edellisen työvuoron lopetusaikaa!",
          className_date: "error",
        }
        })
        return
      }
      let workdayObj = {
        workday_date_string: (parseInt(this.state.workday_date_begin.getDate()) !== parseInt(this.state.workday_date_end.getDate())) 
        ? getStringWithTwoDates(this.state.workday_date_begin, this.state.workday_date_end) 
        : null, //Get a 'DD:MM-DD:MM' -String between two dates
        workday_begin_tod: null,
        workday_end_tod: null,
        workday_total_hours: getDateDifferenceInHours(this.state.workday_date_begin, this.state.workday_date_end),
        'vehicle_id': null,
        'paulig_amount': null,
        'fazer_amount': null,
        'merca_amount': null,
        'messi_amount': null,
        'pahvit_amount': null,
        'akaa_amount': null,
        'other': null,
        workday_date_begin_obj: this.state.workday_date_begin,
        workday_date_end_obj: this.state.workday_date_end,
      }
  
  
      Array.prototype.forEach.call(e.target.elements, function(element) {
        if ((element.value && workdayObj[element.name] == null)) {
          workdayObj[element.name] = element.value
        }
        else if ((!element.value && element.name)) {
          workdayObj[element.name] = '-'
        }
      })
      this.setState(({
        className_date: "",
        className_workhours: "",
        error: "",
        error_date: "",
        error_workhours: "",
        inputValue_date: "",
        workday_begin_tod: "",
        temp_workday_date_begin: "",
        workday_date_begin: "",
        workday_date_end: "",
        workday_end_tod: "",
        workday_total_hours: "",
      }))
      {document.getElementById("workDayForm").reset()}
    this.props.handleAddWorkday(workdayObj)
  
    }
  
    handleChange_date(e) { this.setState({ inputValue_date: e.target.value, error: '', className_date: '', temp_workday_date_begin: ''})}
    handleChange_workhours_begin(e) {this.setState({workday_begin_tod: e.target.value, error_workhours: '', className_workhours: '', workday_date_begin: ''})}
    handleChange_workhours_end(e) {this.setState({workday_end_tod: e.target.value, error_workhours: '', className_workhours: '', workday_date_end: ''})}

    validateDate(inputDate) {
      if (!moment(inputDate, "DD.MM", true).isValid()) {
        this.setState(() => {
          return {
          error: "Anna päivämäärä muodossa PP.KK",
          className_date: "error",
        }
        })
        }
      else {
        let milliseconds = moment(inputDate, "DD.MM").format('x')
        let date = new Date(parseInt(milliseconds))
        if (this.state.workday_date_begin) { // If user has already inputed a workday, we need to change the already existing date
          this.state.workday_date_begin.setDate(date.getDate())
          this.state.workday_date_begin.setMonth(date.getMonth())
        }
        if (this.state.workday_date_end) { // Recalculate end workday, incase workday spans two dates
            this.validateEndHours(this.state.workday_end_tod)
        }
        this.setState(() => {
          return {
            temp_workday_date_begin: date,
            error: ""
        }
        })
      }
    }
  
    validateBeginHours(inputHours) {
      if (!moment(inputHours, "HH:mm", true).isValid()) {
        this.setState(() => {
          return {
          error: "Anna aloitus- ja lopetustunnit muodossa TT:MM.",
          className_workhours: "error",
        } 
        })
        return
      }
      if (this.state.temp_workday_date_begin) {
        let DateString = this.state.temp_workday_date_begin.getDate() + '.' + (this.state.temp_workday_date_begin.getMonth()+1) + '.' + this.state.temp_workday_date_begin.getFullYear() + ' ' + inputHours
        var milliseconds = moment(DateString, "DD.MM.YYYY hh:mm").format('x')
        const date = new Date(parseInt(milliseconds))
        this.setState(() => {
            return {
            workday_date_begin: date,
            error: ""
        }
      })
    }

    }
  
    validateEndHours(inputHours) {
      if (!moment(inputHours, "HH:mm", true).isValid()) {
        this.setState(() => {
          return {
          error: "Anna aloitus- ja lopetustunnit muodossa TT:MM.",
          className_workhours: "error",
        }
        })
        return
    }
      let workday_date_obj_begin = new Date(+this.state.workday_date_begin)
      let workday_date_obj_end = new Date(+this.state.workday_date_begin)
      if (endHoursAreInNextDay(this.state.workday_begin_tod, inputHours)) {
          console.log(workday_date_obj_end)
        workday_date_obj_end.setDate(workday_date_obj_begin.getDate()+1)
        console.log(workday_date_obj_end)
      }
      let DateString = workday_date_obj_end.getDate() + '.' + (workday_date_obj_end.getMonth()+1) + '.' + workday_date_obj_end.getFullYear() + ' ' + inputHours
      var milliseconds = moment(DateString, "DD.MM.YYYY hh:mm").format('x')
      const date = new Date(parseInt(milliseconds))
      this.setState(() => {
        return {
        workday_date_end: date, // This also serves as validation that user has entered the required data
      }
      })
    }
  
    render() {
      const inputDataValidated = () => (!!this.state.inputValue_date && !!this.state.workday_begin_tod && !!this.state.workday_end_tod && !!this.state.workday_date_end && !!this.state.workday_date_begin && !!this.state.temp_workday_date_begin) // Make sure user cannot send wrong data with the form
      return (
        <div>
        <div className="table">
          <span className="td">Anna PVM</span>
          <span className="td">Aloitus klo</span>
          <span className="td">Lopetus klo</span>
          <span className="td">Auto</span>
          <span className="td">Paulig</span>
          <span className="td">Fazer</span>
          <span className="td">Merca</span>
          <span className="td">Messi</span>
          <span className="td">Pahvit</span>
          <span className="td">Akaa</span>
          <span className="td">Muuta</span>
          <form id="workDayForm" className="tr" onSubmit={this.handleAddWorkday}>
          <span className="td"><input type="text" className={this.state.className_date} name="workday_date_string" onChange={this.handleChange_date} value={this.state.inputValue_date} onBlur={() => this.validateDate(this.state.inputValue_date)} /></span>
          <span className="td"><input type="text" value={this.state.workday_begin_tod} name="workday_begin_tod" className={this.state.className_workhours} onChange={this.handleChange_workhours_begin} onBlur={() => this.validateBeginHours(this.state.workday_begin_tod)} /></span>
          <span className="td"><input type="text" value={this.state.workday_end_tod}  name="workday_end_tod" className={this.state.className_workhours} onChange={this.handleChange_workhours_end} onBlur={() => this.validateEndHours(this.state.workday_end_tod)} /></span>
          <span className="td"><input type="text" name="vehicle_id" /></span>
          <span className="td"><input type="text" name="paulig_amount" /></span>
          <span className="td"><input type="text" name="fazer_amount" /></span>
          <span className="td"><input type="text" name="merca_amount" /></span>
          <span className="td"><input type="text" name="messi_amount" /></span>
          <span className="td"><input type="text" name="pahvit_amount" /></span>
          <span className="td"><input type="text" name="akaa_amount" /></span>
          <span className="td"><input type="text" name="other" /> </span>
          <br/><button disabled={true ? this.state.error || !inputDataValidated() : false}>Add Workday</button>
          </form>
          </div>
          {this.state.error && <div className="error">{this.state.error}</div>}
        </div>
      )
    }
  }
  
export default AddWorkday;