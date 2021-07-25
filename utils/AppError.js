// Centralized error object that derives from Node’s Error
class AppError extends Error {
  constructor(
    commonErrorObject,
    { customName = null, customMessage = null, customStatus = null } = {},
  ) {
    super();

    this.name = customName ?? commonErrorObject.name;
    this.message = customMessage ?? commonErrorObject.message;
    this.status = customStatus ?? commonErrorObject.status;
  }
}

export default AppError;
