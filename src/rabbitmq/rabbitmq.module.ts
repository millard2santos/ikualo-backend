import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IkualoService',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'ikualo_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class RabbitmqModule {}
