import React from 'react'
import TohoilyTable from './TohoilyTable'
import TohoilyAddForm from './TohoilyAddForm'
import utils from "../utils"
const axios = require("axios")

class AddTohoily extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        tohoilyt: []
      }
      this.handleAddTohoily = this.handleAddTohoily.bind(this)
  }

    saveResult(tohoilyObj) {  // Send added object to server
      axios.post(`${window.location.protocol}${window.location.hostname}:${window.location.port}/addtohoily`, 
      {
        params: {
          tohoily: tohoilyObj
        }
    })
    }

    handleAddTohoily(TohoilyObj) { // Called when user submits a new töhoily
        this.saveResult(TohoilyObj)
        
        const tohoilytJoinedAndSorted = this.state.tohoilyt.concat([TohoilyObj]).sort((a,b) => { // Sort tohoilyt table by begin date
          return a.tohoilyDate - b.tohoilyDate
        })
        
        this.setState(() => {
          return {
            tohoilyt: tohoilytJoinedAndSorted
            } 
        }
      )
      localStorage.setItem("tohoilyt", JSON.stringify(utils.deepCopy(tohoilytJoinedAndSorted))) // LocalStorage only supports strings
    }

    componentDidMount() {
    
      if (localStorage['tohoilyt'] !== undefined) {
        this.setState({tohoilyt: JSON.parse(localStorage.tohoilyt)}) // Convert the "array of objects as string" back to an array of object
      } 
    }
  
    clearState = () => {
      this.setState({tohoilyt: []})
      localStorage.clear()
    }

    render() {
      return (
        <div>
          <TohoilyTable data={this.state.tohoilyt} />
          <TohoilyAddForm handleAddTohoily={this.handleAddTohoily}/>
          <button disabled={(this.state.tohoilyt && this.state.tohoilyt.length === 0) && true} onClick={this.clearState}>Tyhjennä töhoilylista</button>
        </div>
      )
    }
  }
  
export default AddTohoily