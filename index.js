const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

console.log(`  
    Welcome to EmployeeTrackr. 
    This app will help you manage and view your employee database using inquirer and cTable.
    Type Ctrl+C to quit at any time.
    `
);

const init = () => {
    inquirer
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
                'Update an employee role'
            ]
        }
    ]).then(({option}) => {
        if (option === 'View all departments') {
            const sql = `SELECT * FROM departments`;
            getData(sql);
        } else if (option === 'View all roles') {
            const sql = `SELECT * FROM roles`;
            getData(sql);
            //call init
        } else if (option === 'View all employees') {
            const sql = `SELECT * FROM employee`;
            getData(sql);
            //call init
        } else if (option === 'Add a department') {
            inquirer.prompt([{
                type: 'input',
                name: 'dept',
                message: 'What is the name of the department?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter a department name or type Ctrl+C to quit.');
                        return false;
                    }
                }
            }]).then(({dept}) => {
               postDept(dept);
            })
            //call init
        } else if (option === 'Add a role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What title does this role hold?',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter a title or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'How much is the salary for this title? (numbers only)',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter a number or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'department_id',
                    message: 'What is the department ID number?',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter a department number or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                }
            ]).then(data => {
                postRole(data);
            });
            //call init
        } else if (option === 'Add an employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter the first name of the employee or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter the last name of the employee or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'role_id',
                    message: 'What is the role ID number for this employee? (numbers only)',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter a role ID number or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                },
                {
                    type: 'number',
                    name: 'manager_id',
                    message: 'What is the manager ID number for this employee? (numbers only)',
                    validate: nameInput => {
                        if (nameInput) {
                            return true;
                        } else {
                            console.log('Please enter a manager ID number or type Ctrl+C to quit.');
                            return false;
                        }
                    }
                }
            ]).then(data => {
                postEmp(data);
            });
            //call init
        } else if (option === 'Update an employee role') {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empRoleUpdate',
                    message: "What is the employee's new role",
                    choices: []
                }
            ]).then(data => {
                postEmp(data);
            });
            //UPDATE existing emp
            //call init
        }
    })
};

function getData(x){
    db.promise().query(x)
    .then(([rows])=>{
        console.log(`
        ...retrieving...
        `);
        console.table(rows);
    }).then(()=>init());
};

// function getData(x){
//     db.query(x, function(err, rows) {
//         console.log(`
//         ...retrieving...
//         `)
//         console.table(rows);
//     });
// };

// function getData(x){
//     db.query(x, function(err, rows) {
//         console.log(`
//         ...retrieving...
//         `)
//         console.table(rows);
//     });
// };

function postDept(x){
    const sql = `INSERT INTO departments (dept_name)
    VALUES (?);`;
    db.query(sql, x, function() {
        
        console.log(`
        ...posting...
        `)
        console.table('success');
    });
};

function postRole(x){
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?);`;
    const params = [x.title, x.salary, x.department_id];
    db.query(sql, params, function() {
        
        console.log(`
        ...posting...
        `)
        console.table('success');
    });
};

function postEmp(x){
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?);`;
    const params = [x.first_name, x.last_name, x.role_id, x.manager_id];
    db.query(sql, params, function() {
        
        console.log(`
        ...posting...
        `)
        console.table('success');
    });
};

init();