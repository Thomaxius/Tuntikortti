import React from 'react';
import TohoilyTable from './TohoilyTable'
import TohoilyAddForm from './TohoilyAddForm'

class AddTohoily extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }
    render() {
      return (
        <div>
          <TohoilyTable data={[]} />
          <TohoilyAddForm />
        </div>
      )
    }
  }
  
export default AddTohoily;