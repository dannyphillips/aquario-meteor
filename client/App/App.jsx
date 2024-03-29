import { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  componentWillMount() {
    require('./css/App.import.css');
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
