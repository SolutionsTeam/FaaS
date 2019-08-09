function lambda(input, callback) {
  // Importing the FaaS Toolbelt
  const { Toolbelt } = require("lp-faas-toolbelt");
  // Obtain an HTTPClient Instance from the Toolbelt
  const httpClient = Toolbelt.HTTPClient(); // For API Docs look @ https://www.npmjs.com/package/request-promise

  const URL = "https://va.v.liveperson.net/api/account/71560161/app/0020e28d-ee0d-496f-9b2f-1f3c882fe0bb/report?v=1.1";

  httpClient(URL, {
    method: "PUT", // HTTP VERB
    headers: {
      'Content-Type': 'application/JSON',
      'Accept': 'application/JSON'
    }, // Your Headers
    options: {
      "identities": [
        {
          "iss": "liveperson",
          "acr": "loa1",
          "sub": "twilio_20997621_+19145623709"
        }
      ],
      "engagementAttributes": [
        {
          "type": "ctmrinfo",
          "info": {
            "cstatus": "https://google.com",
            "ctype": "notip",
            "balance": -400.99,
            "currency": "USD",
            "socialId": "55423424242423",
            "imei": "34343433",
            "userName": "user000",
            "companySize": 500,
            "companyBranch": "East Village",
            "accountName": "bank corp",
            "role": "broker",
            "lastPaymentDate": {
              "day": 15,
              "month": 10,
              "year": 2014
            },
            "registrationDate": {
              "day": 23,
              "month": 5,
              "year": 2013
            },
            "storeNumber": "123865",
            "storeZipCode": "20505"
          }
        }
      ]
    },
    // function(err, res, body) {
    //   if (err) {
    //     return console.log(err);}  
    simple: false, // IF true => Status Code != 2xx & 3xx will throw
    resolveWithFullResponse: true //IF true => Includes Status Code, Headers etc.
  })    
    .then(response => {  
      const { statusCode, body } = response;
      // Perform Action based on Status Code
      switch (statusCode) {
        case 202:
          return callback(null, body);
        // If not Whitelisted Proxy will reject with 403. Body contains also a message indicating that
        case 403:
          return callback(new Error("Domain is not whitelisted"), null);
        default:
          return callback(
            new Error(`Recieved unexpected status code ${statusCode}`),
            console.info('res.status')
          );
      }
    })
    .catch(err => callback(err, null));
}
