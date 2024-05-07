import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { configuration } from 'libs/common/config/configuration';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: ((): string => {
            const primary = configuration().database;
            const { connector, user, password, host, port, schema } = primary;
            return `${connector}://${user}:${password}@${host}:${port}?schema=${schema}`;
          })(),
        },
      },
    });
  }
}
