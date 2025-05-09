import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'root',
      password: 'root',
      database: 'productos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ProductosModule,
  ],
})
export class AppModule {}
