import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringToArrayPipe implements PipeTransform {
  constructor(private isRequired = false, private type = 'number') {}

  transform(value: string, metadata: ArgumentMetadata): (number | string)[] {
    if (!value && this.isRequired) {
      throw new BadRequestException(`Query param is required`);
    }

    if (!value) {
      return [];
    }

    return value
      .split(',')
      .map((n) => (this.type === 'number' ? parseInt(n, 10) : n));
  }
}
