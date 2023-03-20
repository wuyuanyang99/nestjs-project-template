import { registerDecorator, ValidationArguments } from 'class-validator';

export function IsStringNoSpace() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringNoSpace',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName}不能为空,且不能包含空格`,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            value !== null &&
            value !== undefined &&
            value !== '' &&
            !value.includes(' ')
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
