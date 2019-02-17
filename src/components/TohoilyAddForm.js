import React from 'react'
import moment from 'moment'

class TohoilyAddForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        tohoilyDateString: moment(new Date()).format('YYYY-MM-DD'),
        tohoilyTime: null,
        error: ''
      }
      this.handleAddTohoily = this.handleAddTohoily.bind(this)
    }

    handleAddTohoily(e) {
      e.preventDefault()
      if (!this.state.tohoilyDateString) {
        this.setState({error: 'Tähdellä merkityt kentät ovat pakollisia.'})
        return
      }
      let tohoilyObj = {
        tohoilyDateString: this.state.tohoilyDateString,
        tohoilyTime: this.state.tohoilyTime,
        severity: '',
        delay: '',
        description: '' 
      }
      
      Array.prototype.forEach.call(e.target.elements, ((element) => { // parse forms 'non-load' fields
        if ((element.value && tohoilyObj[element.name] !== undefined)) {
          tohoilyObj[element.name] = element.value
        }}))

      this.props.handleAddTohoily(tohoilyObj)
        document.getElementById("tohoilyForm").reset()
      const tohoilyDate = new Date(moment(this.state.tohoilyDateString))
      tohoilyDate.setDate(tohoilyDate.getDate()+1)
      this.setState({tohoilyDateString:moment(tohoilyDate).format('YYYY-MM-DD')})
        

    }


    render() {
      return (
        <div>
        <br/>
        <br/>
        <form id="tohoilyForm" onSubmit={this.handleAddTohoily}>
        <div>PVM*</div>
        <input type="date" required value={this.state.tohoilyDateString} onChange={(e) =>this.setState({tohoilyDateString:e.target.value})} onBlur={(e) => this.setState({tohoilyDateString:e.target.value})}/>
        <div>Töhöilyn kellonaika</div>
        <input type="time" onBlur={(e) => this.setState({tohoilyTime:e.target.value})}/>
        <div>Töhöilyn vakavuus</div>
        <select name="severity">
          <option value="minor">Lievä</option>
          <option value="neutral">Keski</option>
          <option value="serious">Vakava</option>
        </select>
        <div>Töhöilystä johtunut viivästyminen minuuteissa</div>
        <input name="delay" type="number"/>
        <div>Töhöilyn kuvaus</div>
        <input name="description" type="text"/>
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