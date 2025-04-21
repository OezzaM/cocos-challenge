import { ApiResponseOptions } from '@nestjs/swagger';

export const SearchInstrumentsSwagger = {
  summary: 'Buscar un activo',
  description: 'Permite al usuario buscar un activo por Ticker o Name.',

  okResponse: {
    status: 200,
    content: {
      'application/json': {
        examples: {
          200: {
            value: {
              results: [
                {
                  id: 1,
                  ticker: 'GGAL',
                  name: 'Grupo Financiero Galicia',
                  type: 'ACCIONES',
                },
              ],
            },
          },
        },
      },
    },
  } as ApiResponseOptions,

  badRequestResponse: {
    status: 400,
    schema: {
      example: {
        statusCode: 400,
        message: [
          'Query cannot be empty',
          'query must be longer than or equal to 3 characters',
        ],
        error: 'Bad Request',
      },
    },
  } as ApiResponseOptions,
};
