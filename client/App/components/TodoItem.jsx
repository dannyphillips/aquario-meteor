import { Component, PropTypes } from 'react';

export default class TodoItem extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired
  }

  handleChecked(e) {
    // Set the checked property to the opposite of its current value
    Meteor.call('setChecked', this.props.entry._id, e.target.checked);
  }

  handleDelete() {
    Meteor.call('deleteEntry', this.props.entry._id);
  }

  handleSetPrivate() {
    Meteor.call('setPrivate', this.props.entry._id, !this.props.entry.private);
  }

  renderTogglePrivate() {
    if (Meteor.userId() !== this.props.entry.owner) {
      return null;
    }

    return (
      <button className="toggle-private" onClick={this.handleSetPrivate.bind(this)}>
        {this.props.entry.private ? 'Private' : 'Public'}
      </button>
    );
  }

  render() {
    let itemClass = '';

    if (this.props.entry.checked) {
      itemClass += 'checked';
    }

    if (this.props.entry.private) {
      itemClass += ' private';
    }

    return (
      <li className={itemClass}>
        <button className="delete" onClick={this.handleDelete.bind(this)}>&times;</button>
        <input type="checkbox" checked={this.props.entry.checked} onChange={this.handleChecked.bind(this)} className="toggle-checked" />
        {this.renderTogglePrivate()}
        <span className="text"><strong>{this.props.entry.username}</strong> - {this.props.entry.text}</span>
      </li>
    );
  }
}
