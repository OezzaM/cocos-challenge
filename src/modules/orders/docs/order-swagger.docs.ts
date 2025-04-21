import { ApiResponseOptions } from '@nestjs/swagger';

export const CreateOrderSwagger = {
  summary: 'Crear una orden',
  description:
    'Permite crear una orden de tipo MARKET o LIMIT para un instrumento determinado.',

  okResponse: {
    status: 201,
    content: {
      'application/json': {
        examples: {
          201: {
            value: {
              id: 1,
              size: 1,
              type: 'LIMIT',
              side: 'BUY',
              price: 10,
              instrumentId: 1,
              userId: 1,
              status: 'created',
              createdAt: '2025-04-21T12:00:00.000Z',
            },
          },
        },
      },
    },
  } as ApiResponseOptions,

  badRequestResponse: {
    status: 400,
    content: {
      'application/json': {
        examples: {
          invalidFields: {
            summary: 'Campos inválidos',
            value: {
              statusCode: 400,
              message: [
                'size must be greater than 0',
                'price must not be provided for MARKET orders',
              ],
              error: 'Bad Request',
            },
          },
          unsupportedType: {
            summary: 'Tipo de orden no soportado',
            value: {
              statusCode: 400,
              message: 'Order type not supported',
              error: 'Bad Request',
            },
          },
        },
      },
    },
  } as ApiResponseOptions,

  notFoundResponse: {
    status: 404,
    content: {
      'application/json': {
        examples: {
          instrumentNotFound: {
            summary: 'Instrumento no encontrado',
            value: {
              statusCode: 404,
              message: 'Instrument not found',
              error: 'Not Found',
            },
          },
        },
      },
    },
  } as ApiResponseOptions,
};
