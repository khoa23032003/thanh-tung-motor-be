import { IsOptional, IsString, MaxLength, IsUrl } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  logoUrl?: string;
}
