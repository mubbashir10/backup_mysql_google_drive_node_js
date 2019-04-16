// google official node js client: https://github.com/googleapis/google-api-nodejs-client
const {google} = require('googleapis');
const drive = google.drive('v3');

// file system module
const fs = require('fs');

// google service account private key (https://developers.google.com/identity/protocols/OAuth2ServiceAccount#creatinganaccount)
const key = require('./../private_key.json');

// create jwt client for 2-legged oAuth (https://github.com/googleapis/google-auth-library-nodejs#json-web-tokens)
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/drive'], //here you add scopes
  null
);

// upload function
function upload_file_on_google_drive(filename, parent_folder_id, delete_after_upload=false){
  // attempt authorization
  jwtClient.authorize((authErr) => {
    
    // if auth is unsuccessful then throw error and stop further execution
    if (authErr) {
      console.log(authErr);
      return;
    }

    // otherwise, proceed and make authorized requests
    else{

      // create file meta data
      const fileMetadata = {
        name: filename, //name of the file to be created on google drive
        parents: [parent_folder_id] // id of the parent folder
      };
      
      // create data object (from file contents)
      const media = {
        mimeType: 'text/plain',
        body: fs.createReadStream(filename)
      };
      
      // initate create request
      drive.files.create({
        auth: jwtClient,
        resource: fileMetadata,
        media,
        fields: 'id'
      }, (err, file) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('File created with ID: ', file.data.id);

        // if allowed, delete the file once upload from local
        if(delete_after_upload){
          fs.unlink(filename, (err)=>{
            if(err){
              console.log('An error occurred while deleting th DB file: '+err)
            }
          })  
        }
      });
    }
  });
}


module.exports = upload_file_on_google_drive
