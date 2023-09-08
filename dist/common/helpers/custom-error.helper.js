"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCustomException = exports.customError = void 0;
const common_1 = require("@nestjs/common");
const customError = (error) => {
    if (error.errno) {
        switch (error.errno) {
            case '1062':
                throw new common_1.InternalServerErrorException(error.detail, {
                    cause: error,
                    description: 'Unique constraint violation',
                });
            case '1452':
                throw new common_1.InternalServerErrorException(error.detail, {
                    cause: error,
                    description: 'Foreign key constraint violation',
                });
            default:
                throw new common_1.InternalServerErrorException(error.message, {
                    cause: error,
                    description: 'Database error',
                });
        }
    }
    else if (error.response) {
        throw new MyCustomException(error.response.message, error.response.statusCode);
    }
    throw new common_1.InternalServerErrorException();
};
exports.customError = customError;
class MyCustomException extends common_1.HttpException {
    constructor(message, status) {
        super(message, status);
    }
}
exports.MyCustomException = MyCustomException;
//# sourceMappingURL=custom-error.helper.js.map