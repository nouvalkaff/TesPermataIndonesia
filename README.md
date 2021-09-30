Disclaimer: data penting seperti dalam file .env dan config database sengaja tidak dimasukkan kedalam .gitignore karena saya beranggapan file-file itu akan masuk dalam penilaian. Terima kasih untuk pengertiannya.

Tes awal untuk proses rekrutmen di PT Permata Indonesia.


-------------------------------------------------------------------------------
How to use locally:

1. Type cd on terminal into same folder with "app.js".
2. Type "npm start" to run node or "npm run dev" to run nodemon instead of node.
3. All routes can be seen in documentation link below.
4. Change "https://app-permata-indonesia.herokuapp.com" to "localhost:port_number"
-------------------------------------------------------------------------------


-------------------------------------------------------------------------------
How to use the app on Heroku Server:

1. The using of app on Heroku server can be seen within documentation link below.
-------------------------------------------------------------------------------

```
Note: if error message below appeared it mostly because of token-login-related problem
{
    "code": 500,
    "statustext": "Internal Server Error",
    "success": false,
    "message": "Failed to get data"
}
```

DB: PostgreSQL

Program: NodeJS

Dependencies: bcrypt, cors, dotenv, express, joi, jsonwebtoken, pg, pg-hstore, sequelize, sequelize-cli

Documentation: https://documenter.getpostman.com/view/15855641/UUxxhoQt

Heroku App: https://app-permata-indonesia.herokuapp.com
