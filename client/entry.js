// Methods for optimistic updates
require('../server/app-methods');

require('./routes');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
