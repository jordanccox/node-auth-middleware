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
    if (apiKeyList.includes(request.headers["x-authentication"])) {
        return true;
    }
    return false;
};
// Validate login
// TODO: Right now, this does not utilize a database or Node crypto, but just implements basic (and NOT SECURE) validation logic. Update in the future.
// Returns user if username or password match user in users array.
// Returns null if no matched user is found and by default.
var getUserFromCredentials = function (request, usersList) {
    var username = request.body.username;
    var password = request.body.password;
    if (!username || !password) {
        return null;
    }
    var matchedUser = usersList.find(function (user) { return user.login.username === username; });
    if (!matchedUser) {
        return null;
    }
    if (matchedUser.login.password === password) {
        return matchedUser;
    }
    return null;
};
