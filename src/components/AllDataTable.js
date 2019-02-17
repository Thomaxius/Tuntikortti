import React from 'react'
import moment from 'moment'

class Table extends React.Component {
  render() {
    if (!this.props.data) {
      return <div>Ei näytettävää dataa.</div>
    }
    const Table = ({ objects }) =>
      <table>
        <tr>
          <th>  PVM  </th>
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
          <th>Töhoilyt</th>
        </tr>
        {objects.map(element => <Row object={element} />)}
      </table>

    const Row = ({ object }) =>
      <tr>
        <td>
          {moment(object.workday_begin).format("ddd DD-MM-YY")}
        </td>
        <td>
          {moment(object.workday_begin).format("HH:mm")}
        </td>
        <td>
          {moment(object.workday_end).format("HH:mm")}
        </td>
        <td>
          {moment(object.workday_end).diff(moment(object.workday_begin), 'hours', true).toFixed(2)}
        </td>
        <td>
          {object.vehicle_id}
        </td>
        <td>
          {object.paulig_amount}
        </td>
        <td>
          {object.fazer_amount}
        </td>
        <td>
          {object.merca_amount}
        </td>
        <td>
          {object.messi_amount}
        </td>
        <td>
          {object.pahvit_amount}
        </td>
        <td>
          {object.akaa_amount}
        </td>
        <td>
          {object.kesko_amount}
        </td>
        <td>
          {object.other_amount}
        </td>
        <td>
          {object.other}
        </td>
        <td>{object.tohoilyt}</td>
      </tr>

    return (
      <div>
        {<Table objects={this.props.data} />}
      </div>
    )
  }
}

export default Table