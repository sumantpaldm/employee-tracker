const inquirer = require("inquirer");
const sql = require("mysql2");
const table = require("console.table");
const fs = require("fs");




var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'emptracker',
    password: 'Waheguru@58!'
});




const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: '<<<<<PLEASE SELECT THE AVAILABLE OPTIONS>>>>>',
            choices: ['<VIEW ALL DEPARTMENTS>',
                '<VIEW ALL ROLES>',
                '<VIEW ALL EMPLOYEES>',
                '<ADD A DEPARTMENT>',
                '<ADD A ROLE>',
                '<ADD AN EMPLOYEE>',
                'UPDATE AN EMPLOYEE',
                '<<<EXIT>>>']
        }
    ])
        .then(userSelect => {
            switch (userSelect.menu) {
                case '<VIEW ALL DEPARTMENTS>':
                    selectDepartments();
                    break;
                case '<VIEW ALL ROLES>':
                    selectRoles();
                    break;
                case '<VIEW ALL EMPLOYEES>':
                    selectEmployees();
                    break;
                case '<ADD A DEPARTMENT>':
                    promptAddDepartment();
                    break;
                case '<ADD A ROLE>':
                    promptAddRole();
                    break;
                case '<ADD AN EMPLOYEE>':
                    promptAddEmployee();
                    break;
                case 'UPDATE AN EMPLOYEE':
                    promptUpdateRole();
                    break;
                default:
                    process.exit();
            }
        })
};


const selectDepartments = () => {
    connection.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        });
};


const selectRoles = () => {
    connection.query(
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        }
    )
};


const selectEmployees = () => {
    connection.query(
        "SELECT E.id, E.first_name, E.last_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name,' ',M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id;",
        (err, results) => {
            console.table(results); // results contains rows returned by server
            promptMenu();
        }
    )
};


