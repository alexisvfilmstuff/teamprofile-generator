// fs to writeFile to .html
const fs = require("fs");
// inquirer to prompt the user for team members and position;
const inquirer = require("inquirer");
// questions for the inquirer
const questions = require("./develop/lib/questions");
// empty string for the generated card data to be loaded to the html;
let html = "";
// require classes;
const Manager = require("./develop/lib/Manager");
const Engineer = require("./develop/lib/Engineer");
const Intern = require("./develop/lib/Intern");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");

function createEmployee() {
  inquirer
    .prompt(questions.empQuestions)
    .then(answers => {
      switch (answers.role) {
        case "Engineer":
          inquirer.prompt(questions.engQuestion).then(engineerAnswers => {
            const engineerData = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              engineerAnswers.github
            );

            readEngFile(engineerData);

            restartInquirer();
          });
          break;
        case "Manager":
          inquirer.prompt(questions.mgmtQuestion).then(async managerAnswers => {
            const managerData = await new Manager(
              answers.name,
              answers.id,
              answers.email,
              managerAnswers.officeNumber
            );
            console.log('managerData', managerData)
            readMgnFile(managerData);

            restartInquirer();
          });
          break;
        case "Intern":
          inquirer
            .prompt(questions.internQuestion)
            .then(async internAnswers => {
              const internData = await new Intern(
                answers.name,
                answers.id,
                answers.email,
                internAnswers.internSchool
              );


              readInternFile(internData);

              restartInquirer();
            });
          break;
      }
    })
    .catch(err => {
      throw err;
    });
}

function restartInquirer() {
  inquirer.prompt(questions.newQuestion).then(answer => {
    switch (answer.role) {
      case "YES!!!":
        createEmployee();
        break;

      case "NOPE, THATS EVERYONE!":
        createHTML();
        break;
    }
  });
}

// working
function readEngFile(engineerData) {
  // console.log(engineerData);
  // data is my html string,
  const icon = `<i class="fas fa-glasses fa-2x"></i>`;
  fs.readFile("./develop/templates/engineer.html", "utf8", function (error, data) {
    // console.log(engineerData.name);
    const newData = data
      .replace("Ename:", engineerData.name)
      .replace("Eicon:", icon)
      .replace("Eid", engineerData.id)
      .replace("Eemail", engineerData.email)
      .replace("Egighub", engineerData.github);

    // read .html for all class values and the combine them before writing the file.
    html += newData;
    // console.log(html);
  });
}
// not working
function readMgnFile(managerData) {
  // data is my html string,
  const icon = `<i class="far fa-chart-bar fa-2x"></i>`;
  fs.readFile("./develop/templates/manager.html", "utf8", function (error, data) {
    const newData = data
      .replace("Mname:", managerData.name)
      .replace("Micon:", icon)
      .replace("Mid", managerData.id)
      .replace("Memail", managerData.email)
      .replace("Mphone", managerData.officeNumber);

    // read .html for all class values and the combine them before writing the file.
    html += newData;

  });
}
// not working
function readInternFile(internData) {
  console.log(internData);
  // data is my html string,
  const icon = `<i class="fas fa-eye fa-2x"></i>`;
  fs.readFile("./develop/templates/intern.html", "utf8", function (error, data) {
    const newData = data
      .replace("Iname:", internData.name)
      .replace("Iicon:", icon)
      .replace("Iid", internData.id)
      .replace("Iemail", internData.email)
      .replace("Ischool", internData.school);

    // read .html for all class values and the combine them before writing the file.
    html += newData;
    console.log('newdata', newData)
  });
}

function createHTML() {
  fs.readFile("./develop/html/main.html", "utf8", (err, data) => {
    const newData = data.replace("{{html}}", html);

    fs.writeFile("./develop/output/index.html", newData, "utf8", err => {
      if (err) return console.log(err);
    });
    console.log(".html created");
  });
}

module.exports = {};

createEmployee();