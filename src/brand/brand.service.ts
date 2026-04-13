import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBrandDto } from 'src/brand/dto/query-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBrandDto, userId?: string) {
    const name = dto.name.trim();

    const existed = await this.prisma.brand.findFirst({
      where: {
        name,
        deletedFlg: 0,
      },
    });

    if (existed) {
      throw new ConflictException('Brand name already exists');
    }

    return this.prisma.brand.create({
      data: {
        name,
        logoUrl: dto.logoUrl ?? null,
        createdBy: userId ?? null,
      },
    });
  }

  async findAll(query: QueryBrandDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedFlg: 0,
    };

    if (query.keyword) {
      where.name = {
        contains: query.keyword,
        mode: 'insensitive',
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.brand.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.brand.count({ where }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  // update(id: number, updateBrandDto: UpdateBrandDto) {
  //   return `This action updates a #${id} brand`;
  // }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
