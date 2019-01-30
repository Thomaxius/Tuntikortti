import React from 'react'

class TohoilyAddForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render() {
        const inputDataValidated = () => (!!this.state.inputValue_date && (!!this.state.workday_begin_tod || (!this.state.workday_begin_tod && this.state.urakka)) && (!!this.state.workday_end_tod || (!this.state.workday_end_tod && this.state.urakka)) && (!!this.state.workday_date_begin || (!this.state.workday_date_begin && this.state.urakka)) && (!!this.state.temp_workday_date_begin || (!this.state.temp_workday_date_begin && this.state.urakka)))// Make sure user cannot send wrong data with the form
      return (
        <div>
        <br/>
        <br/>
        <form>
        <div>PVM</div>
        <input onBlur={this.validateDate}/>
        <div>Töhöilyn kellonaika</div>
        <input/>
        <div>Töhöilyn vakavuus</div>
        <input/>
        <div>Töhöilystä johtunut viivästyminen</div>
        <input/>
        <br/>
        <br/>
        <button>Lisää töhöily</button>
        </form>
          {this.state.error && <div className="error">{this.state.error}</div>}
        
        </div>
      )
    }
  }
  
export default TohoilyAddForm