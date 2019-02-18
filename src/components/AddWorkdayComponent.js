import React from 'react'
import moment from 'moment'
import utils from "../utils"


class AddWorkday extends React.Component {
    constructor(props) {
      super(props)
      this.handleAddWorkday = this.handleAddWorkday.bind(this)
      this.handleChange_date_begin = this.handleChange_date_begin.bind(this)
      this.handleChange_date_end = this.handleChange_date_end.bind(this)
      this.validateDate = this.validateDate.bind(this)
      const initialDate = new Date()
      const initialDate2 = new Date()
      initialDate2.setMinutes(initialDate.getMinutes()+1)
      this.state = {
        error_date: "",
        error: '',
        error_workhours: "",
        workday_date_begin: initialDate,
        workday_date_end: initialDate2,
        workday_total_hours: "",
      }
    }

  async handleAddWorkday(e) {
    let eCopy = Object.assign({}, e) // element disappear somewhere and I cba to search why, possibly references to state object which gets emptied
    e.preventDefault()
    const resultObj = await this.props.workdayIsValid(this.state)
    if (resultObj.error && resultObj.message) {
      this.setState(() => {
        return {
          error: resultObj.message,
        }
      }

    )
    return
    }
      e = eCopy
    let workdayObj = {
      workday_date_string: utils.getTwoDateStrings(this.state.workday_date_begin, this.state.workday_date_end),
      workday_total_hours: utils.getDateDifferenceInHours(this.state.workday_date_begin, this.state.workday_date_end),
      loads: [{
        'paulig_amount': 0,
        'fazer_amount': 0,
        'merca_amount': 0,
        'messi_amount': 0,
        'pahvit_amount': 0,
        'akaa_amount': 0,
        'kesko_amount': 0,
        'other_amount': 0
      }],
      'other': '',
      workday_date_begin: new Date(this.state.workday_date_begin.getTime()), // We need to clone the date object because below it is modified (javascript and object-referencing..)
      workday_date_end: new Date(this.state.workday_date_end.getTime()),
      workday_hours_begin_string: utils.getPaddedHhmmsString(this.state.workday_date_begin),
      workday_hours_end_string: utils.getPaddedHhmmsString(this.state.workday_date_end)
    }
    // workday_total_hours: !this.state.urakka ? utils.getDateDifferenceInHours(this.state.workday_date_begin, this.state.workday_date_end) :
    // ((this.state.workday_date_begin && this.state.workday_date_end) ?
    // utils.getDateDifferenceInHours(this.state.workday_date_begin, this.state.workday_date_end) + ' (Urakka)' : 'Urakka'), //If we have urakka, we will only count hours if one has input them as they are optional.
    // workday_hours_begin_string: !(this.state.urakka && this.state.workday_date_begin) ? utils.getPaddedHhmmsString(this.state.workday_date_begin) : 'Urakka',
    // workday_hours_end_string: !(this.state.urakka && this.state.workday_date_end) ? utils.getPaddedHhmmsString(this.state.workday_date_end) : 'Urakka',
      Array.prototype.forEach.call(e.target.elements, ((element) => { // parse forms 'non-load' fields
        if ((element.value && workdayObj[element.name] !== undefined)) {
          workdayObj[element.name] = element.value
          
        }
        else if ((element.value && workdayObj['loads'][0][element.name] !== undefined)) // Parse forms 'loads' -fields
          workdayObj['loads'][0][element.name] = Number(element.value)
        })
      )

      this.props.handleAddWorkday(workdayObj)
      document.getElementById("workDayForm").reset()
      this.state.workday_date_begin.setDate(this.state.workday_date_begin.getDate()+1)
      this.state.workday_date_end.setDate(this.state.workday_date_end.getDate()+1)

      this.setState(({
        className_date: "",
        className_workhours: "",
        error: "",
        error_date: "",
        error_workhours: "",
        urakka: this.state.urakka,
        inputValue_date: "",
        workday_date_begin: this.state.workday_date_begin,
        workday_date_end: this.state.workday_date_end,
        workday_total_hours: "",
      }))

  
    }
    handleChange_date_begin(e) {this.setState({workday_date_begin: new Date(e.target.value), error: ''})}
    handleChange_date_end(e) {this.setState({workday_date_end: new Date(e.target.value), error: ''})} 
    validateDate = () => {
      if (utils.date1IsAfterDate2(this.state.workday_date_begin, this.state.workday_date_end)) { 
        this.setState({'error': 'Tarkista aloitus- ja lopetusajat.'}) // User tries to enter a workday end date that is before begin date, or vice versa
        return false 
      }
      else {
        return true
      }
    }
    render() {
      

      // User has to input date + begin and end hours, unless he has checked 'urakka'
    return (
        <div>
        <br/><br/><br/><br/>
        <div className="table">
            <form id="workDayForm" className="tr" onSubmit={this.handleAddWorkday}>
              <div className="tr">   
              <span className="td"><span className="td_title">Aloitus klo</span><input type="datetime-local"  required  onBlur={() => this.validateDate()} onFocus={() => this.setState({error:''})} onChange={this.handleChange_date_begin} value={moment(this.state.workday_date_begin).format("YYYY-MM-DDTHH:mm")}/></span>
              <span className="td"><span className="td_title">Lopetus klo</span><input type="datetime-local"  required  onBlur={() => this.validateDate()} onFocus={() => this.setState({error:''})} onChange={this.handleChange_date_end} value={moment(this.state.workday_date_end).format("YYYY-MM-DDTHH:mm")}/></span>
              </div>
              <div className="tr">
              <span className="td"><span className="td_title">Auto</span><input type="text" name="vehicle_id" /></span>
              <span className="td"><span className="td_title">Paulig</span><input type="number" name="paulig_amount" /></span>
              </div>
              <div className="tr">
              <span className="td"><span className="td_title">Fazer</span><input type="number" name="fazer_amount" /></span>
              <span className="td"><span className="td_title">Merca</span><input type="number" name="merca_amount" /></span>
              </div>
              <div className="tr">     
              <span className="td"><span className="td_title">Messi</span><input type="number" name="messi_amount" /></span>
              <span className="td"><span className="td_title">Pahvit</span><input type="number" name="pahvit_amount" /></span>
              </div>
              <div className="tr">   
              <span className="td"><span className="td_title">Akaa</span><input type="number" name="akaa_amount" /></span>
              <span className="td"><span className="td_title">Kesko</span><input type="number" name="kesko_amount" /></span>
              </div>
              <div className="tr">
              <span className="td"><span className="td_title">Muut</span><input type="number" name="other_amount" /></span>
              <span className="td"><span className="td_title">Muu selite</span><input type="text" name="other" /> </span>
              </div>
            <br/><button disabled={true ? this.state.error : false}>Lisää työpäivä tuntikorttiin</button>
            </form>
          </div>
          {this.state.error && <div className="error">{this.state.error}</div>}
        </div>
      )
    }
  }
  
export default AddWorkday