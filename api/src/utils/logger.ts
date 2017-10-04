import * as pino from 'pino'
import * as stream from 'stream'

class LoggerConfig {
protected loggerConfig() {
      const pretty: stream.Transform = pino.pretty({
        'levelFirst': true,
        'forceColor': true
      })
      pretty.pipe(process.stdout)
      const log: pino.Logger = pino({
        name: 'pregnant-ua'
      }, pretty)
      return log
  }
}
class Logger extends LoggerConfig {

  public loggerInfo = (message: string, output = '') => {
    return super.loggerConfig().info(message, output)
  }

  public loggerError = (message: string, output = '') => {
    return super.loggerConfig().error(message, output)
  }
}

export default new Logger()