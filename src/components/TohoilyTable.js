import React from 'react'
import moment from 'moment'

class Table extends React.Component {
    render() {
      const Table = ({objects}) =>
      <table>
      <tr>
        <th>PVM</th>
        <th>kellonaika</th>
        <th>vakavuus</th>
        <th>Viivästyminen</th>
        <th>Kuvaus</th>
      </tr>
        {objects.map(element => <Row object={element} />)}
      </table>
    
      const Row = ({object}) =>

        <tr>
          <td>
            {moment(object.tohoilyDateString).format("ddd DD-MM-YYYY")}
          </td>
          <td>
            {object.tohoilyTime}
          </td>
          <td>
            {object.severity}
          </td>
          <td>
            {object.delay && object.delay + " min"}
          </td>
          <td>
          {object.description}
        </td>
      </tr>

      return (
        <div>
            {<Table objects={this.props.data}/>}
        </div>
      )
    }
}

export default Table