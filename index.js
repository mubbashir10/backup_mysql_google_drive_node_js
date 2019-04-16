const backup = require('./lib/mysqldump_integration') 
const google_drive = require('./lib/google_drive_integration') 
const date = require('date-and-time')

// create file name by using current timestamp
let now = new Date()
filename = 'dump_'+date.format(now, 'YYYY_MM_DD_(HH_mm_ss)')+'.sql'

// create database backup (host, username, password, database, filename)
backup('localhost', 'root', '', 'db', filename)

// upload to google drive (filename, parent id (use 'root' to upload in root directory), true/fasle (delete the file from local after uploading, default is false))
google_drive(filename, 'root', true)


