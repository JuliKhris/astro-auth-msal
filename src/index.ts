import fp from 'fastify-plugin'
import { FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import fastifyAuthMSAL from "./types";

const fastifyAuthMsal = async(fastify:FastifyInstance, opts:fastifyAuthMSAL.FastifyAuthMSALOptions)=>
{
  if (typeof opts.validate !== 'function') {
    throw new Error('Auth: Missing validate function')
  }
  const validate = opts.validate.bind(fastify)

  const authMsal = (req: FastifyRequest, reply: FastifyReply, next: any) => {
    const done = (err: any) => {
        if (err !== undefined) {
           // We set the status code to be 401 if it is not set
          if (!err.statusCode) {
            err.statusCode = 401;
          }
          // if (err.statusCode === 401) {
          //   reply.header('WWW-Authenticate', authenticateHeader(req))
          // }
          next(err);
        } else {
          next();
        }
      }

    const result = validate(req, reply, done)
    if (result && typeof result.then === 'function') {
      result.then(done, done)
    }
    
}
 fastify.decorate('authMsal', authMsal )
}

const authMsal = fp(fastifyAuthMsal, {
  fastify: '4.x',
  name: '@julikhris/fastify-msal'
})

export default authMsal
