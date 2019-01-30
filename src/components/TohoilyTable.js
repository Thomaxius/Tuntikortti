


import React from 'react';

class Table extends React.Component {
    render() {
      const Table = ({objects}) =>
      <table>
      <tr>
        <th>PVM</th>
        <th>Töhöilyn kellonaika</th>
        <th>Töhöilyn vakavuus</th>
        <th>Töhöilystä johtunut viivästyminen</th>
      </tr>
        {objects.map(element => <Row object={element} />)}
      </table>
    
      const Row = ({object}) =>

        <tr>
          <td>
            {object.tohoilyDate}
          </td>
          <td>
            {object.tohoilyTod}
          </td>
          <td>
            {object.tohoilySeriousness}
          </td>
          <td>
            {object.delay}
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