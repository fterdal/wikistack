const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});
const utils = require('../utils');

/*
url-safe title
[a-z\-_\(\)]*
*/
const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /[a-z\-_\(\)]*/i
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    defaultValue: "closed"
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle
    }
  }
});

Page.hook('beforeValidate', (page, options) => {
  page.urlTitle = utils.urlify(page.title);
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  getterMethods: {
    route() {
      return '/users/' + this.id;
    }
  }
});

// User.hasMany(Page);
Page.belongsTo(User, {as: 'author'});

module.exports = { Page, User, db };
