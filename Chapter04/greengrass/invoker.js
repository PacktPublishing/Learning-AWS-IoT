

const ggSdk = require('aws-greengrass-core-sdk');
const lambdaClient = new ggSdk.Lambda();

exports.handler = function handler(event, context) {
    console.log(event);
    console.log(context);

    const cxt = {
        custom: {
            customData: 'customData',
        },
    };
    const contextString = JSON.stringify(cxt);
    const buff = new Buffer(contextString);
    const clientContext = buff.toString('base64');

    const params = {        
        FunctionName: 'arn:aws:lambda:<region>:<accountId>:function:echo-lambda',
        InvocationType: 'RequestResponse',
        ClientContext: clientContext,
        Payload: JSON.stringify({ msg: 'hello world' }),
    };

    lambdaClient.invoke(params, (err, data) => {
        if (err) {
            console.error(err, err.stack);
        } else {
            console.log(data);
        }
    });
};
