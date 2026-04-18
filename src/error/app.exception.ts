import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from './error-codes';
import { ERROR_MESSAGES } from './error-messages';

export class AppException extends HttpException {
  constructor(code: ERROR_CODES, status = HttpStatus.BAD_REQUEST) {
    super(
      {
        code,
        message: ERROR_MESSAGES[code],
      },
      status,
    );
  }
}
