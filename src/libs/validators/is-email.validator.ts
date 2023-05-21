import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { emailRegexp } from 'src/libs/regexps';

@ValidatorConstraint({ name: 'isEmailValidator', async: false })
export class IsEmailValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return emailRegexp.test(value) && value.length <= 256;
  }

  defaultMessage() {
    return `Incorrect email`;
  }
}
