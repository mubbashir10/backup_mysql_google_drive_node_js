**Getting Started**

1) Clone the repo:

<pre>git clone https://github.com/mubbashir10 backup_mysql_google_drive_node_js.git</pre>

2) cd into the project and run npm install (to install dependencies)

<pre>
cd backup_mysql_google_drive_node_js
npm install</pre>

3) edit index.js and enter your database credentials

4) create google service account (https://developers.google.com/identity/protocols/OAuth2ServiceAccount#creatinganaccount), generate a private key (in json format) and place it in the root of the repo and rename it as 'private_key.json'