import ReactDOM from 'react-dom'
import React from 'react'
import AppComponent from './components/AppComponent'


const Header = () => {
  return (
    <div>
  <div class="header">
    <a>Tuntikortti</a>
    </div>
  </div>
)
}


class TuntikorttiApp extends React.Component {


    render() {
      return (
        <div>
          <Header />
          <div className="content">
            <AppComponent />
          </div>
        </div>
      )
    }
  }

ReactDOM.render(<TuntikorttiApp />, document.getElementById('app'));
