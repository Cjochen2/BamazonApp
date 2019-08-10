# BAMazon

Welcome to Bamazon!

Bamazon is a simulation of a store interface utilizing a mySQL Database to make purhcases by customers and track inventory and product for managers. Below is a demonstration of how each feature works. To go more in depth select the bamazonCustomer.js file to get started.

Prior to using Bamazon you will need to install the following npm packages and provide your own .env file with a password to access your mySQL database.

   * [Express](https://www.npmjs.com/package/express)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

   * [mySQL](https://www.npmjs.com/package/mysql)

   * 

## Customer Interface:

![Customer1](/images/customer1.JPG)

In the above image you can see how the app flows. Upon initilization the user is presented with a list of available items and asked to enter the Item ID and how many of the item they wish to purchase. The application then checks to make sure there are enough in stock. If there are enough Items the app completes the order and prints out a total cost to the customer and prompts to see if the customer would like to make another purchase. If not the connection terminates.

![Customer2](/images/customer2.JPG)

In this second image you can see the flow of events if the customers order exceeds the stock quanity. The application informs the customer and then asks if they would like to make another purchase. In this example the customer then tries to make the same purchase using a smaller order and is successful.

## Manager Interface:

![Manager1](/images/Manager1.JPG)

In the above image a manager initializes the application and is presented with a list of options. The manager selects what they would like to do from the list. In this case they elect to view the inventory and after viewing terminate the application.

![Manager2](/images/manager2.JPG)

In this example the manager elects to view specifically low invetory items which is qualified as anything below 5. After seeing the low inventory the manager is prompted to see if they wish to do anything else. Here the manager decided to purchase more inventory. The application updates the stock quanity and then loops again. The manager then terminates the application.

## Thoughts and Summary:

This was an introduction to utilizing mySQL with Node. The application itself was fairly easy for me to design and greatly enhanced my understaning of how mySQL works as well as utilizing JS and Node to run an application. I plan to add the feature to the manager side that allows the user to add a new product to the database for customer purchase.