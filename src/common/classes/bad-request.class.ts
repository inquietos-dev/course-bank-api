
/*
    "url": "/user",
    "timestamp": "2021-04-30T15:12:23.562Z",
    "message": [
        "role must be uppercase",
        "role must be a valid enum value",
        "password must be longer than or equal to 8 characters",
        "password must be a string",
        "email must be an email",
        "age must be a number conforming to the specified constraints",
        "city must be longer than or equal to 3 characters",
        "city must be a string"
    ],
    "statusCode": 400
 */

import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
  @ApiProperty({ type: String, example: '/*' })
  url: string;

  @ApiProperty({ type: Date, example: '2021-04-30T15:12:23.562Z' })
  timestamp: Date;

  @ApiProperty({
    example: [
      "* must be uppercase",
      "* must be a valid enum value"
    ],
    type: String,
    isArray: true,
  })
  message: string[];

  @ApiProperty({ example: 400, type: Number })
  statusCode: number;
}
