var urlParser = require("url");
// Validate access tokens
// Returns null if no access tokens found
// Returns access token object if "accessToken" in url matches valid access token in list of tokens
var getValidToken = function (request, accessTokensList) {
    var parsedUrl = urlParser.parse(request.url, true);
    if (!parsedUrl.query.accessToken) {
        return null;
    }
    var matchedAccessToken = accessTokensList.find(function (accessToken) {
        return accessToken.token == parsedUrl.query.accessToken;
    });
    if (!matchedAccessToken) {
        return null;
    }
    return matchedAccessToken;
};
// Get common CORS headers
// Returns object
var getCorsHeaders = function () {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authentication",
    };
};
// Validate API key
// Takes request object and array of valid API key strings as arguments
// Returns true if API key is present in 'x-authentication' header and false if not
var validateApiKey = function (request, apiKeyList) {
    if (apiKeyList.includes(request.headers['x-authentication'])) {
        return true;
    }
    return false;
};
var testRequest = {
    headers: {
        'x-authentication': '1t3'
    }
};
var testApiKeyList = ['123', 'abc'];
console.log(validateApiKey(testRequest, testApiKeyList));
