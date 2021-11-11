const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const init = () =>{
    console.log(`Welcome to EmployeeTrackr. 
    This app will help you manage and view your employee database using inquirer and cTable.
    Type Ctrl+C to quit at any time.`)

    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role', 
                'Add an employee', 
                'Update an employee role',
            ]
        }
    ])
    .then(({type}) => {
        if (type === 'View all departments') {
            //call depts using ctable
            //call init
        } if (type === 'View all roles') {
            //call roles using ctable
            //call init
        } if (type === 'View all employees') {
            //call emps using ctable
            //call init
        } if (type === 'Add a department') {
            //ask (name)
            //INSERT dept into departments table 
            //call init
        } if (type === 'Add a role') {
            //ask (title, salary, department_id)
            //INSERT role into roles table 
            //call init
        } if (type === 'Add an employee') {
            //ask (first_name, last_name, role_id, manager_id)
            //INSERT emp into employee table 
            //call init
        } if (type === 'Update an employee role') {
            //UPDATE existing emp
            //call init
        }
    })
};

init();