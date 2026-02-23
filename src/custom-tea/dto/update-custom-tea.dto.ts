import { PartialType } from '@nestjs/swagger';
import { CreateCustomTeaDto } from './create-custom-tea.dto';

export class UpdateCustomTeaDto extends PartialType(CreateCustomTeaDto) {}
