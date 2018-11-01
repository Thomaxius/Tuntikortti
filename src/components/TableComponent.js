import React from 'react';

class Table extends React.Component {
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
      </tr>
        {objects.map(element => <Row object={element} />)}
      </table>
    
      const Row = ({object}) =>

        <tr>
          <td>
            {object.workday_date_string}
          </td>
          <td>
            {object.workday_begin_tod}
          </td>
          <td>
            {object.workday_end_tod}
          </td>
          <td>
            {object.workday_total_hours}
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
      </tr>

      return (
        <div>
            {<Table objects={this.props.data}/>}
        </div>
      )
    }
}

export default Table;