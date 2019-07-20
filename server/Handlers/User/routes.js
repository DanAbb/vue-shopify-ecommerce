/* @flow */
import GetUser from './GetUser'
import Joi from 'joi'

const routes = [
  {
    method: 'GET',
    path: '/User/GetUser/{id}',
    handler: GetUser,
    config: {
      cors: true,
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
        }
      }
    }
  }
];

export default routes
