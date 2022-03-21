# Storefront Backend Project

### Getting Started

This repo contains a Storefront Backend Project constructing an API. To get started.

## Setup and Connect to the database
 - clone this repo 
 - run `docker compose up`
 - switch to the postgres user `su postgres`
 - start psql `psql postgres`
 - in psql run the following:
 - `CREATE USER {dbUserName} WITH PASSWORD '{password}';`
 - `CREATE DATABASE {dbName};`
 - `\c full_stack_dev`
 - `GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;`
 - to test that it is working run \dt and it should output "No relations found."
 
## Package installation instructions
 - install yarn `npm install yarn -g`
 - install db-migrate on the machine for terminal commands `npm install db-migrate -g`
 - check node version `node -v` - it needs to be 10 or 12 level
 - IF node was not 10 or 12 level, run `npm install -g n` , `n 10.18.0`, `PATH="$PATH"`
 - run `node -v` to check that the version is 10 or 12
 - install all project dependencies yarn to run the migrations `yarn install`
 - run `db-migrate up` to migrate and update the database
 - run `yarn watch` in your terminal at the project root to show the app starting on port `3000`.

 ## environment variables 

 - `PR_DB_HOST=127.0.0.1`
 - `PR_DEV_DB={dbName}`
 - `PR_TEST_DB={dbTestName}`
 - `PR_DB_USER={dbUserName}`
 - `PR_DB_PASSWORD={password}`
 - `ENV={ENV : 'dev' - 'test'}`
 - `BYCRYPT_PASSWORD=hi-man-how-are-you`
 - `SALT_ROUNDS=10`
 - `TOKEN_SECRET=alohomora123!`


## API Endpoints
#### Products
- Index : GET `localhost:3000/products`
- Show  (args: product id) : GET `localhost:3000/products/:id`
- Create [token required] : POST `localhost:3000/products`
- Delete (args: product id)[token required] : DELETE `localhost:3000/products/:id`
- Top 5 most popular products : GET `localhost:3000/five-most-popular`

#### Users
- Index [token required] : GET `localhost:3000/users`
- Show (args: user id)[token required] : GET `localhost:3000/users/:id`
- Create N[token required] : POST `localhost:3000/users`
- Edit (args: user id)[token required] : PUT `localhost:3000/users/:id`
- Delete [token required] : DELETE `localhost:3000/users/:id`

#### Orders

- Index [token required] : GET `localhost:3000/orders`
- Show (args: user id)[token required] : GET `localhost:3000/orders/:id`
- Create N[token required] : POST `localhost:3000/orders`
- Edit (args: user id)[token required] : PUT `localhost:3000/orders/:id`
- Delete [token required] : DELETE `localhost:3000/orders/:id`

- Current Order by user (args: user id)[token required] : GET `localhost:3000/current-orders-by-user/:id`
- [OPTIONAL] Completed Orders by user (args: user id)[token required] : GET `localhost:3000/completed-orders-by-user/:id`
## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
