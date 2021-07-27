// Centralized error object that derives from Node’s Error
class AppError extends Error {
  constructor(
    commonErrorObject,
    { customType = null, customMessage = null, customStatus = null, details = [] } = {},
  ) {
    super();

    this.type = customType ?? commonErrorObject.type;
    this.message = customMessage ?? commonErrorObject.message;
    this.status = customStatus ?? commonErrorObject.status;
    this.details = details;
  }
}

export default AppError;
