import { IsString, IsNumber, Matches, Min, MinLength, MaxLength, IsInt } from 'class-validator';

export class CreateProductoDto {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  nombre: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  precio: number;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @Matches(/^[0-9a-zA-Z]+\.(png|jpg|webp|svg|gif)$/)
  image: string;
}
