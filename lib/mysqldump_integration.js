// mysqldump (https://github.com/bradzacher/mysqldump)
const mysqldump = require('mysqldump')

function generate_mysql_dump(host, user, password, database_name, filename){
    mysqldump({
        connection: {
            host: host,
            user: user,
            password: password,
            database: database_name
        },
        dumpToFile: filename,
    })
}

module.exports = generate_mysql_dump