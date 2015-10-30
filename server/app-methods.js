import Entries from '../collections/Entries';

Meteor.methods({
  addEntry: function (text) {
    // Make sure the user is logged in before inserting a entry
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteEntry: function (entryId) {
    var entry = Entries.findOne(entryId);
    if (entry.private && entry.owner !== Meteor.userId()) {
      // If the entry is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Entries.remove(entryId);
  },
  setChecked: function (entryId, setChecked) {
    var entry = Entries.findOne(entryId);
    if (entry.private && entry.owner !== Meteor.userId()) {
      // If the entry is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Entries.update(entryId, { $set: { checked: setChecked} });
  },
  setPrivate: function (entryId, setToPrivate) {
    var entry = Entries.findOne(entryId);

    // Make sure only the entry owner can make a entry private
    if (entry.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.update(entryId, { $set: { private: setToPrivate } });
  }
});
