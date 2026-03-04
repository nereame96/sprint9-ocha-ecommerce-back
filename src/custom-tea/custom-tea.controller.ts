import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomTeaService } from './custom-tea.service';
import { CreateCustomTeaDto } from './dto/create-custom-tea.dto';
import { UpdateCustomTeaDto } from './dto/update-custom-tea.dto';
import { CustomTea } from "./schemas/custom-tea.schema";
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    _id: string;
  };
}

@ApiTags('CustomTeas')
@Controller('custom-tea')
export class CustomTeaController {
  constructor(private readonly customTeaService: CustomTeaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCustomTeaDto: CreateCustomTeaDto,
    @Req() req: RequestWithUser,
  ): Promise<CustomTea> {

    const userId = req.user.userId

    return this.customTeaService.create(createCustomTeaDto, userId);
  }

  @Get()
  async findAll(): Promise<CustomTea[]> {
    return this.customTeaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomTea> {
    return this.customTeaService.findOne(id);
  }

  @Get('user/my-customTeas')
  @UseGuards(JwtAuthGuard)
  async findMyCustomTeas(@Req() req: RequestWithUser) {
    return this.customTeaService.findByCreator(req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string, 
    @Body() updateCustomTeaDto: UpdateCustomTeaDto,
    @Req() req: RequestWithUser,
  ) {
    return this.customTeaService.update(id, updateCustomTeaDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.customTeaService.remove(id, req.user.userId);
  }
}
