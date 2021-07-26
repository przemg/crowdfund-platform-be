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
