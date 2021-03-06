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
  connection.query('SELECT item_id, product_name, price FROM products', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log('Item ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name + ' || Price: $' + res[i].price);
    }
    order();
  });
};


function order() {
  connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'input',
          message: 'Please enter the item id of the product you wish to purchase today'
        },
        {
          name: 'quantity',
          type: 'input',
          message: 'How many would you like to purchase?'

        }
      ])
      .then(function (answer) {

        var chosenItem = res[parseInt(answer.choice) - 1];

        if (parseInt(chosenItem.stock_quantity) < parseInt(answer.quantity)) {
          console.log('Insufficent Quantity for your order');
          cont();
        } else {

          connection.query(
            'UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity)
              },
              {
                item_id: chosenItem.item_id
              }
            ],

            function (error) {
              if (error) throw (error);
              console.log('\nYour order has been successfully placed' + '\nYour total is: ' + chosenItem.price * answer.quantity);
              cont();
            }
          );
        }
      })
  }
  )
};


function cont() {
  inquirer
    .prompt(
      {
        name: 'continue',
        type: 'confirm',
        message: 'Would you like to make another purchase?'
      },

    )
    .then(function (answer) {
      if (answer.continue === true) {
        start();
      } else {
        console.log('Thank you for shopping at Bamazon! Have a great day.')
        connection.end();
      }
    });

};