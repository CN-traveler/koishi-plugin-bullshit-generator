import { Argv, Context, Schema } from 'koishi'
import Bullshit from '@lwys-pkg-releaser/node-bullshit-generator'

export const name = 'bullshit-generator'

export interface Config {
  default: {
    subject: string,
    length: number
  }
}

export const Config: Schema<Config> = Schema.object({
  default: Schema.object({
    subject: Schema.string().default('koishi').min(1).max(1000).description('默认主题'),
    length: Schema.number().default(100).min(1).max(1000).description('默认长度')
  })
})

export function apply(ctx: Context, config: Config) {
  const logger = ctx.logger(name)
  const bullshit = new Bullshit();
  ctx.command('bullshit.generator <subject:string> [length:number]', '狗屁不通文章生成').action(async (argv: Argv, subject: string, length: number) => {
    try {
      subject = (typeof subject === 'string' && subject !== '') ? subject : config.default.subject
      length = (typeof length === 'number' && length <= 1000 && length > 0) ? length : config.default.length
      return bullshit.生成(subject, length)
    }
    catch (error) {
      logger.error(error.message)
    }
  })
}
