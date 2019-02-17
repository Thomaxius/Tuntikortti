import React from 'react'
import moment from 'moment'


class Table extends React.Component {
  constructor(props) {
    super(props)
      this.deleteWorkday = this.props.deleteWorkday.bind(this)
    }

    render() {
      const Table = ({objects}) =>
      <table>
      <tr>
        <th>PVM</th>
        <th>Aloitus klo</th>
        <th>Lopetus klo</th>
        <th>Tunnit</th>
        <th>Auto</th>
        <th>Paulig</th>
        <th>Fazer</th>
        <th>Merca</th>
        <th>Messi</th>
        <th>Pahvit</th>
        <th>Akaa</th>
        <th>Kesko</th>
        <th>Muut</th>
        <th>Muu selitys</th>
        {objects.lenght !== 0 && <th></th>}
      </tr>
        {objects.map(element => <Row object={element} id={objects.indexOf(element)} />)}
      </table>
    
      const Row = ({object, id}) => {
        return (
        <tr>
          <td>
          {object.workday_date_string}
          </td>
          <td>
            {object.workday_hours_begin_string}
          </td>
          <td>
            {object.workday_hours_end_string}
          </td>
          <td>
            {object.workday_total_hours}
          </td>
          <td>
            {object.vehicle_id}
          </td>
          <td>
            {object['loads'][0].paulig_amount}
          </td>
          <td>
            {object['loads'][0].fazer_amount}
          </td>
          <td>
            {object['loads'][0].merca_amount}
          </td>
          <td>
            {object['loads'][0].messi_amount}
          </td>
          <td>
            {object['loads'][0].pahvit_amount}
          </td>
          <td>
            {object['loads'][0].akaa_amount}
          </td>
          <td>
          {object['loads'][0].kesko_amount}
        </td>
        <td>
        {object.other_amount}
      </td>
          <td>
            {object.other}
          </td>
          <td>
          <a href="#" onClick={() => this.deleteWorkday(id)}>Poista</a>
          </td>
          </tr>
        )
        }

      return (
        <div className="content">
            {<Table objects={this.props.data}/>}
        </div>
      )
    }
}

export default Table