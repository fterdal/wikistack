const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

/*
[a-z\-_\(\)]*
*/
const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
  },
  urlTitle: {
    type: Sequelize.STRING,
    validate: {
      is: /[a-z\-_\(\)]*/i
    }
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

module.exports = { Page, User };
