import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { QueryBrandDto } from 'src/brand/dto/query-brand.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { UseGuards } from '@nestjs/common';
import { Permissions } from 'src/auth/Decorator/permission.decorator';
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Permissions('brand:add')
  @Post()
  create(@Body() dto: CreateBrandDto) {
    const userId = 'system';
    return this.brandService.create(dto, userId);
  }

  @Get()
  findAll(@Query() query: QueryBrandDto) {
    return this.brandService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
  //   return this.brandService.update(+id, updateBrandDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
