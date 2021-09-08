const empQuestions = [
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the employee ID?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the employee email?",
    name: "email"
  },
  {
    type: "list",
    message: "What is the job title?",
    name: "role",
    choices: ["Engineer", "Intern", "Manager"]
  }
];

const engQuestion = [
  {
    type: "input",
    message: "What is the GitHub user-name?",
    name: "github"
  }
];

const mgmtQuestion = [
  {
    type: "input",
    message: "What is the office phone number?",
    name: "officeNumber"
  }
];

const internQuestion = [
  {
    type: "input",
    message: "What is the school name?",
    name: "internSchool"
  }
];

const newQuestion = [
  {
    type: "list",
    message: "Would you like to add a team member?",
    name: "role",
    choices: ["YES!!!", "NOPE, THATS EVERYONE!"]
  }
];

// object literal
module.exports = {
  empQuestions,
  engQuestion,
  mgmtQuestion,
  internQuestion,
  newQuestion
};