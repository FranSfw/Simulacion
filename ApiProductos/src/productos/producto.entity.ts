import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  precio: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  image: string;
}
