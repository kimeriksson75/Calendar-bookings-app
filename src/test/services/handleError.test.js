import { handleError } from '../../services/handleError';

describe('handleError', () => {
  it('should return an error object when err.response exists', async () => {
    const error = {
      response: {
        status: 400,
        statusText: 'Bad Request',
        data: {
          message: 'Error message',
          errors: ['Error 1', 'Error 2']
        },
      }
    };

    const expectedErrorObject = {
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data.message,
      errors: error.response.data.errors
    };

    await expect(handleError(error)).rejects.toEqual(expectedErrorObject);
  });

  it('should return a rejected promise with "request error" when err.request exists', async () => {
    const error = {
      request: 'Some request error'
    };

    await expect(handleError(error)).rejects.toEqual('request error');
  });

  it('should return a rejected promise with the error message when err.message exists', async () => {
    const error = {
      message: 'Some error message'
    };

    await expect(handleError(error)).rejects.toEqual('Some error message');
  });

  it('should return a rejected promise with "unknown error" when none of the error properties exist', async () => {
    const error = {};

    await expect(handleError(error)).rejects.toEqual('unknown error');
  });
});