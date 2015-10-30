import { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  static propTypes = {
    entries: PropTypes.array.isRequired
  }

  render() {
    return (
      <ul>
        {this.props.entries.map(entry => <TodoItem key={entry._id} entry={entry} />)}
      </ul>
    );
  }
}
