const urlParser = require("url");

// Define 'Req' request object type
interface Req {
  url: string;
  headers: {
    "x-authentication": string;
  };
  body: { username: string; password: string };
}

// Validate access tokens
// Returns null if no access tokens found
// Returns access token object if "accessToken" in url matches valid access token in list of tokens
const getValidToken = (
  request: Req,
  accessTokensList: Array<{ token: string }>
): null | object => {
  const parsedUrl = urlParser.parse(request.url, true);

  if (!parsedUrl.query.accessToken) {
    return null;
  }

  const matchedAccessToken = accessTokensList.find((accessToken) => {
    return accessToken.token == parsedUrl.query.accessToken;
  });

  if (!matchedAccessToken) {
    return null;
  }

  return matchedAccessToken;
};

// Get common CORS headers
// Returns object
const getCorsHeaders = (): object => {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, X-Authentication",
  };
};

// Validate API key
// Takes request object and array of valid API key strings as arguments
// Returns true if API key is present in 'x-authentication' header and false if not
const validateApiKey = (request: Req, apiKeyList: Array<string>): boolean => {
  if (apiKeyList.includes(request.headers["x-authentication"])) {
    return true;
  }

  return false;
};

// Validate login
// TODO: Right now, this does not utilize a database or Node crypto, but just implements basic (and NOT SECURE) validation logic. Update in the future.
// Returns user if username or password match user in users array.
// Returns null if no matched user is found and by default.
const getUserFromCredentials = (
  request: Req,
  usersList: Array<{ login: { username: string; password: string } }>
): null | object => {
  const username = request.body.username;
  const password = request.body.password;

  if (!username || !password) {
    return null;
  }

  const matchedUser = usersList.find(
    (user) => user.login.username === username
  );

  if (!matchedUser) {
    return null;
  }

  if (matchedUser.login.password === password) {
    return matchedUser;
  }

  return null;
};
