import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  create(dto: CreateProductoDto) {
    const producto = this.productoRepo.create(dto);
    return this.productoRepo.save(producto);
  }

  findAll() {
    return this.productoRepo.find();
  }

  findOne(id: number) {
    return this.productoRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const prod = await this.productoRepo.findOneBy({ id });
    if (!prod) throw new NotFoundException('Producto no encontrado');
    return this.productoRepo.remove(prod);
  }
}
