import { ApiResponseOptions } from '@nestjs/swagger';

export const GetPortfolioSwagger = {
  summary: 'Obtener portfolio del usuario',
  description:
    'Devuelve el resumen del portfolio actual del usuario, incluyendo posiciones, inversión y rendimiento.',

  okResponse: {
    status: 200,
    content: {
      'application/json': {
        examples: {
          example: {
            summary: 'Portfolio con posiciones',
            value: {
              portfolioValue: {
                availableCash: 900000,
                positions: [
                  {
                    instrumentId: 1,
                    size: 45,
                    invested: 7770,
                    currentValue: 11655,
                    performance: 50,
                  },
                  {
                    instrumentId: 47,
                    size: 40,
                    invested: 37100,
                    currentValue: 37034,
                    performance: -0.18,
                  },
                  {
                    instrumentId: 54,
                    size: 500,
                    invested: 125000,
                    currentValue: 114750,
                    performance: -8.2,
                  },
                ],
                totalValue: 163439,
              },
              message: 'Calculated',
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
          invalidQuery: {
            summary: 'Parámetros inválidos',
            value: {
              statusCode: 400,
              message: ['userId must be a positive number'],
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
          noPortfolio: {
            summary: 'User not found',
            value: {
              statusCode: 404,
              message: 'User not found',
              error: 'Not Found',
            },
          },
        },
      },
    },
  } as ApiResponseOptions,
};
