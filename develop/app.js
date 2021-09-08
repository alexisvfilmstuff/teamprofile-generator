const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const { writeFile, write } = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// create an empty array to input employees info
const team = []

// function that prompts user a question specified to interns
const createIntern = ({ name, id, email }) => {
  prompt({
    type: 'input',
    name: 'school',
    message: 'Where did they attend school?'
  })
    .then(({ school }) => {
      team.push(new Intern(name, id, email, school))
      console.log('Intern created!')
      menu()
    })
}

// function that prompts user a question specified to engineers
const createEngineer = ({ name, id, email }) => {
  prompt({
    type: 'input',
    name: 'github',
    message: 'What is their GitHub username?'
  })
    .then(({ github }) => {
      team.push(new Engineer(name, id, email, github))
      console.log('Engineer created!')
      menu()
    })
}

// function that prompts user a question specified to managers
const createManager = ({ name, id, email }) => {
  prompt({
    type: 'number',
    name: 'officeNumber',
    message: 'What is their office number?'
  })
    .then(({ officeNumber }) => {
      team.push(new Manager(name, id, email, officeNumber))
      console.log('Manager created!')
      menu()
    })
}

// function that prompts user to create and input employee info
const createEmployee = () => {
  prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Which employee would you like to create?',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is their name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their employee id?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email?'
    }
  ])
    .then(({ role, ...employee }) => {
      switch (role) {
        case 'Manager':
          createManager(employee)
          break
        case 'Engineer':
          createEngineer(employee)
          break
        case 'Intern':
          createIntern(employee)
          break
      }
    })
}

// function that prompts user to create a team
const menu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Create new employee', 'Finish']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Create new employee':
          createEmployee()
          break
        case 'Finish':
          writeFile('./output/team.html', render(team), err => {
            if (err) { console.log(err) }
            else { console.log('Team created!') }
          })
          break
      }
    })
}

// calls menu function
menu()