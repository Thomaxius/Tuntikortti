
import React from 'react'
import utils from '../utils'

class SumComponent extends React.Component { // This is a lazily-made component which sums loads and hours in current workday-objects
    getTotals(obj) {

      let totalObj = {
        TotalLoads: 0,
        Paulig: 0,
        Fazer: 0,
        Merca: 0,
        Messi: 0,
        Pahvit: 0,
        Akaa: 0,
        Kesko: 0,
        Other: 0,
      }

      let totalHours = 0

        obj.forEach(element => {
            !isNaN(element.loads[0].akaa_amount) && (totalObj.Akaa += Number(element.loads[0].akaa_amount))
            !isNaN(element.loads[0].fazer_amount) && (totalObj.Fazer += Number(element.loads[0].fazer_amount))
            !isNaN(element.loads[0].merca_amount) && (totalObj.Merca += Number(element.loads[0].merca_amount))
            !isNaN(element.loads[0].messi_amount) && (totalObj.Messi += Number(element.loads[0].messi_amount))
            !isNaN(element.loads[0].pahvit_amount) && (totalObj.Pahvit += Number(element.loads[0].pahvit_amount))
            !isNaN(element.loads[0].paulig_amount) && (totalObj.Paulig += Number(element.loads[0].paulig_amount))
            !isNaN(element.loads[0].kesko_amount) && (totalObj.Kesko += Number(element.loads[0].kesko_amount))
            !isNaN(element.loads[0].other_amount) && (totalObj.Other += Number(element.loads[0].other_amount))
            element.workday_date_begin && element.workday_date_end && (totalHours += Number(utils.getDateDifferenceInHours(new Date(element.workday_date_begin), new Date(element.workday_date_end))))
        })
      let total = 0
      Object.values(totalObj).forEach(element => total += element)

      return (
        <span>
          Yhteensä: {total} kuormaa<br/>
          Tunnit: {totalHours}h<br/>
          Paulig: {totalObj.Paulig}<br/>
          Fazer: {totalObj.Fazer}<br/>
          Merca: {totalObj.Merca}<br/>
          Messi: {totalObj.Messi}<br/>
          Pahvit: {totalObj.Pahvit}<br/>
          Akaa: {totalObj.Akaa}<br/>
          Kesko: {totalObj.Kesko}<br/>
          Muut: {totalObj.Other}
        </span>
      )
      



    }

    render() {
      return (
        <div>
          {(this.props.workdays.length !== 0 || this.props.workdays !== undefined) && <div className="bold">{this.getTotals(this.props.workdays)}</div>}
          </div>
      )
    }
  }



  
  export default SumComponent
