//engineer class constructor
const employee = require("./employee")

class engineer extends employee {
  constructor (name, id, email, github) {
    super(name, id, emial);
    this.github = github;
    this.role = "engineer";
  }
  getRole() {
    return this.role;
  }
  getGithub() {
    return this.github;
  }
}

module.exports = engineer;