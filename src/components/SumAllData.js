
import React from 'react'

class SumAllData extends React.Component {
    constructor(props) {
      super(props)
    }

    getTotals = () => 
        <div>
        Yhteensä:<br/><br/>
        Tunnit: {this.props.data[0].total_hours && this.props.data[0].total_hours.toFixed(2) + "h"} &nbsp;
        Kesko: {this.props.data[0].total_kesko} &nbsp;
        Paulig: {this.props.data[0].total_paulig} &nbsp;
        Fazer: {this.props.data[0].total_fazer} &nbsp;
        Pahvit: {this.props.data[0].total_pahvit} &nbsp;
        Muut: {this.props.data[0].total_other} &nbsp;
        </div>
    

    render() {
      return (
        <div>
          {(this.props.data.length !== 0 || this.props.data !== undefined) && <div className="bold">
          {this.getTotals()}
          </div>}
          </div>
      )
    }
  }



  
  export default SumAllData
