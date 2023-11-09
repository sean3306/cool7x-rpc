import {Provide} from "@midwayjs/decorator";
import {Context} from "vm";

@Provide()
export class Util{

  async getReqIP(ctx: Context) {
    const ips =
      (ctx.req.headers['x-forwarded-for'] as string) ||
      (ctx.req.headers['X-Real-IP'] as string) ||
      (ctx.req.headers['x-real-ip'] as string) ||
      (ctx.req.headers['x-natapp-ip'] as string) ||
      (ctx.ip.replace('::ffff:', '') as string) ||
      (ctx.req.socket.remoteAddress.replace('::ffff:', '') as string);

    return ips;
    // return ( req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace('::ffff:', ''));
  }

}
