export const SERVER_ERROR = {
  status: 500,
  type: 'ServerError',
  message: "'Server has encountered a problem and cannot complete the request'",
};

export const RESOURCE_NOT_FOUND = {
  status: 404,
  type: 'ResourceNotFound',
  message: 'Resource with given id cannot be found',
};

export const DATA_VALIDATION_ERROR = {
  status: 422,
  type: 'DataValidationError',
  message: 'Passed data in the request body are wrong',
};

export const PASSED_DATA_EXISTS = {
  status: 400,
  type: 'PassedDataExists',
  message: 'Entered data is already in use',
};

export const WRONG_CREDENTIALS = {
  status: 400,
  type: 'WrongCredentials',
  message: 'Email or password is wrong',
};

export const USER_ALREADY_LOGGED_IN = {
  status: 400,
  type: 'UserAlreadyLoggedIn',
  message: 'User is already logged in and cannot access this resource',
};

export const USER_UNAUTHENTICATED = {
  status: 401,
  type: 'UserUnauthenticated',
  message: 'User identity has not been confirmed, please log in and try again',
};
