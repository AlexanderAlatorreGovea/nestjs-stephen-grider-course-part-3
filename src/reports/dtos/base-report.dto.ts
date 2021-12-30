import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsString } from 'class-validator';

export class BaseReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
