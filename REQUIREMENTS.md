# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : GET `localhost:3000/products`
- Show (args: product id) : GET `localhost:3000/products/:id`
- Create [token required] : POST `localhost:3000/products`
- Top 5 most popular products : GET `localhost:3000/five-most-popular`

#### Users
- Index [token required] : GET `localhost:3000/users`
- Show (args: user id)[token required] : GET `localhost:3000/users/:id`
- Create N[token required] : POST `localhost:3000/users`

#### Orders
- Current Order by user (args: user id)[token required] : GET `localhost:3000/current-orders-by-user/:id`
- Completed Orders by user (args: user id)[token required] : GET `localhost:3000/completed-orders-by-user/:id`

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- username
- first_name
- last_name
- password
- phone
- about

#### Orders
- id
- user_id
- status of order (active or complete)

#### Order Products
- id
- quantity of each product in the order
- id of each product in the order
- order_id


