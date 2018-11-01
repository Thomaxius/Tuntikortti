
import React from 'react'

class SumComponent extends React.Component {
    constructor(props) {
      super(props)

    }
    
    getTotalUrakka(obj) {

      let totalObj = {Paulig: 0,
        Fazer: 0,
        Merca: 0,
        Messi: 0,
        Pahvit: 0,
        Akaa: 0,
        Kesko: 0,
        Other: 0
      }
  
        obj.forEach(element => {
          if (element.urakka || !element.urakka) {
            !isNaN(element.akaa_amount) && (totalObj.Akaa += parseInt(element.akaa_amount))
            !isNaN(element.fazer_amount) && (totalObj.Fazer += parseInt(element.fazer_amount))
            !isNaN(element.merca_amount) && (totalObj.Merca += parseInt(element.merca_amount))
            !isNaN(element.messi_amount) && (totalObj.Messi += parseInt(element.messi_amount))
            !isNaN(element.pahvit_amount) && (totalObj.Pahvit += parseInt(element.pahvit_amount))
            !isNaN(element.paulig_amount) && (totalObj.Paulig += parseInt(element.paulig_amount))
            !isNaN(element.kesko_amount) && (totalObj.Kesko += parseInt(element.kesko_amount))
            !isNaN(element.other_amount) && (totalObj.Other += parseInt(element.other_amount))
          }
        })
      let total = 0
      Object.values(totalObj).forEach(element => total += element)

      return (
        <span>
          Yhteensä: {total}<br/>
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
          {(this.props.workdays.length != 0 || this.props.workdays ==! undefined) && <div className="bold">{this.getTotalUrakka(this.props.workdays)}</div>}
          </div>
      )
    }
  }



  
  export default SumComponent;
