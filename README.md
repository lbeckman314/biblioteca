# To add main database

```sql
-- create database "biblioteca_main"
CREATE DATABASE biblioteca_main;

-- create user "biblioteca"
CREATE USER 'biblioteca'@'localhost' IDENTIFIED BY 'PASSWORD';
GRANT ALL PRIVILEGES ON biblioteca_main.* TO 'biblioteca'@'localhost';
FLUSH PRIVILEGES;
```

```sh
mysql -u biblioteca -p -h localhost biblioteca_main
source public/program.sql
```

# To add login capabilities

```sql
-- create database "biblioteca_users"
CREATE DATABASE biblioteca_users;

-- create user "biblioteca_login"
CREATE USER 'user'@'localhost' IDENTIFIED BY 'PASSWORD';
GRANT ALL PRIVILEGES ON biblioteca_users.* TO 'biblioteca_login'@'localhost';
FLUSH PRIVILEGES;
```

# Run server

```sh
npm install
node database.js PORT
```
