import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';
import ReactMeteorData from 'react-meteor-data';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import Entries from '../../collections/Entries';

@ReactMixin.decorate(ReactMeteorData)
export default class Main extends Component {

  state = {
    hideCompleted: false
  }

  getMeteorData() {
    Meteor.subscribe('entries');

    let entryFilter = {};

    if (this.state.hideCompleted) {
      entryFilter.checked = {$ne: true};
    }

    const entries = Entries.find(entryFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Entries.find({checked: {$ne: true}}).count();

    return {
      entries,
      incompleteCount,
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  }

  render() {
    if (!this.data.entries) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <Link to="/admin">Admin</Link>
          <TodoHeader
              incompleteCount={this.data.incompleteCount}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
          />
          <TodoList entries={this.data.entries} />
        </div>
    );
  }
};
