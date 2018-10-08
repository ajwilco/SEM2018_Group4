const aws = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1"
};

aws.config.update(awsConfig);

let db = new aws.DynamoDB({apiVersion: '2012-10-08'});
let fetchOneByKey = function() {
    let params = {
        TableName: "users",
        Key: {
            "userId": "example_ID"
        }
    };
    
    db.getItem(params, function(err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    });
};

fetchOneByKey();