import {
    FastifyRequest,
    FastifyPluginAsync,
    FastifyReply,
    onRequestHookHandler,
    preValidationHookHandler,
    preHandlerHookHandler,
    FastifyInstance
  } from 'fastify'
  
  declare module 'fastify' {
    interface FastifyInstance {
        fastifyAuthMSAL: onRequestHookHandler |
      preValidationHookHandler |
      preHandlerHookHandler
    }
  }
  
  type FastifyAuthMSAL = FastifyPluginAsync<fastifyAuthMSAL.FastifyAuthMSALOptions>
  export type  Validate  = (
    this:FastifyInstance,
    req: FastifyRequest,
    reply: FastifyReply,
    done: ( next:any, reply:FastifyReply, err?: Error, ) => void
  )=> void | Promise<void | Error>

  declare namespace fastifyAuthMSAL{
    export interface FastifyAuthMSALOptions {
      validate:Validate
      authenticate?: boolean | { realm: string | ((req: FastifyRequest) => string) };
    }
  
   
    export const fastifyAuthMSAL: FastifyAuthMSAL
    export { fastifyAuthMSAL as default }
  }
  
  declare function fastifyBasicAuth(...params: Parameters<FastifyAuthMSAL>): ReturnType<FastifyAuthMSAL>
  export default fastifyAuthMSAL
