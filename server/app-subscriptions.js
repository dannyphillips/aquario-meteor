import Entries from '../collections/Entries';

// This code only runs on the server
Meteor.publish('entries', function () {
  return Entries.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });
});
