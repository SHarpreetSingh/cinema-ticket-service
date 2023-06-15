import { connect, Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export class Database {
  private url: string | undefined
  private connectionOptions: Record<string, unknown>
  requestLogDatabaseConnection: any

  constructor(options: {
    url: string | undefined
    connectionOptions?: Record<string, unknown>
  }) {
    const {
      url,
      connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    } = options

    this.url = url
    this.connectionOptions = connectionOptions
  }

  async connect(): Promise<void> {
    if (this.url) {
      const mongoose = await connect(this.url.toString(), this.connectionOptions)
      console.log('Database Connected Successfully.')
    }
  }
}
