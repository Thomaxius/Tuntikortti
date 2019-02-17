import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch, NavLink } from 'react-router-dom';
import { setMessage } from './store/appReducer';
// import logo from './logo.svg';
import './styles.css';
import './c3.css';

const Header = () => {
    return (
      <div>
    <div className="header">
    <div className="header-content">
      <a>Tuntikortti</a>
      <li className="dropdown">
      <a href="javascript:void(0)" className="dropbtn">Toiminnot..</a>
      <div className="dropdown-content">
        <a href="/">Lisää työvuoro</a>
        <a href="/addtohoily">Lisää töhöily</a>
        <a href="/showall">Näytä työpäivät</a>
        <a href="/charts">Kaaviot</a>
      </div>
    </li>
    </div>
      </div>
    </div>
  )
  }

const MainWorkdayComponent = Loadable({
    loader: () => import('./components/MainWorkdayComponent'),
    loading: () => <div>loading...</div>,
    modules: ['myNamedChunk'],
});


const AddTohoilyComponent = Loadable({
    loader: () => import('./components/AddTohoily'),
    loading: () => <div>loading...</div>,
    modules: ['pageAnother'],
});

const AllDataComponent = Loadable({
    loader: () => import('./components/AllDataComponent'),
    loading: () => <div>loading...</div>,
    modules: ['pageAnother'],
});

const ChartComponent = Loadable({
    loader: () => import('./components/ChartComponent'),
    loading: () => <div>loading...</div>,
    modules: ['pageAnother'],
});

class App extends Component {

    render() {
        return (
            
            <div>
                <Header />
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={MainWorkdayComponent} />
                        <Route path="/addtohoily" component={AddTohoilyComponent} />
                        <Route path="/showall" component={AllDataComponent} />
                        <Route path="/charts"  component={ChartComponent} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(
    connect(
        ({ app }) => ({
            message: app.message,
        }),
        dispatch => ({
            updateMessage: (messageText) => dispatch(setMessage(messageText)),
        })
    )(App)
);
