import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringToArrayPipe implements PipeTransform {
  constructor(private isRequired = false) {}

  transform(value: string, metadata: ArgumentMetadata): string[] {
    if (!value && this.isRequired) {
      throw new BadRequestException(`Query param is required`);
    }

    if (!value) {
      return [];
    }

    return value.split(',');
  }
}
