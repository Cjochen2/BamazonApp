require("dotenv").config();
var key = require("./key.js");
var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: key.password.id,
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: '\nWhat do you wish to do?',
            choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product', 'All done']
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'View products for sale':
                    view();
                    break;
                case 'View low inventory':
                    low();
                    break;
                case 'Add to inventory':
                    add();
                    break;
                case 'Add new product':
                    console.log('NEWWWWW');
                    break;
                case 'All done':
                    connection.end();
                    break;
                default:

            }

        })
};

function view() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name + ' || Department: ' + res[i].department_name + ' || Price: $' + res[i].price + ' || In-Stock: ' + res[i].stock_quanity);
        }

        start();

    });

};

function low() {
    connection.query('SELECT * FROM products WHERE stock_quanity < 5', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('\nItem ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name + ' || Department: ' + res[i].department_name + ' || Price: $' + res[i].price + ' || In-Stock: ' + res[i].stock_quanity);
        }

        start();

    });

};

function add() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to restock?"
                },
                {
                    name:'quantiy',
                    type: 'input',
                    message: 'How many would you like to purchase?'
                }
            ])
            .then(function (answer){
                var chosenItem = chosen;
                for(var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice){
                        var chosen = results[i];
                    }
                }
                console.log(chosenItem);
                // connection.query('UPDATE products SET ? WHERE ?'
                // [
                //     {
                //         stock_quanity: chosenItem.stock_quantity + parseInt(answer.quantity)
                //     },
                //     {
                //         item_id: chosenItem.item_id
                //     }
                // ])
            })
    }
    )
};