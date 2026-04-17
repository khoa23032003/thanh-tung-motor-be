import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Request,
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
  @Permissions('brand:create')
  @Post()
  create(@Body() dto: CreateBrandDto, @Request() req) {
    return this.brandService.create(dto, req.user.id);
  }

  @Permissions('brand:view')
  @Get()
  findAll(@Query() query: QueryBrandDto) {
    return this.brandService.findAll(query);
  }

  @Permissions('brand:view')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Permissions('brand:delete')
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.brandService.remove(id, req.user.id);
  }
}
