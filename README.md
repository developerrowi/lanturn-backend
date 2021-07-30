# student-management-backend-boilerplate
## Requirements Used
XAMPP for ease of setup (Apache for php and mysql)
MySQL
NodeJS
Sequelize

### Setup

1. Install XAMPP on local machine
2. Create .env on root of project, Set variables to match mysql connection, this is my sample env default setup for xampp on fresh install
            
        APP_PORT=4000
        DB_HOST=localhost
        DB_USER=root
        DB_PASS=
        DB_NAME=student-management-db
        DB_DIALECT=mysql
        DB_PORT=3306
        APP_HOST=localhost
        NODE_ENV=development
     
3. Run xampp apache and mysql

### Usage

Install dependencies using node

`npm install`

Create db
`npm run db:create`

Create needed tables on the dbase

`npm run db:migrate`

Run Dev Server 

`npm run dev`

