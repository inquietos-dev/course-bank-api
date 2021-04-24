import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseFloatPipe implements PipeTransform {
  constructor(private isRequired = false) {}

  transform(value: string, metadata: ArgumentMetadata): number {
    if (!value && this.isRequired) {
      throw new BadRequestException(`Query param is required`);
    }

    return parseFloat(value);
  }
}
