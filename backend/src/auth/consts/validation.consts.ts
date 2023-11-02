import { ValidationArguments } from 'class-validator';

export const PASSWOR_TOO_WEAK =
  'Пароль должен содержать хотя бы 1 заглавную букву, 1 строчную букву, 1 цифру или специальный символ';

export const IS_A_STRING = ({ property }: ValidationArguments) =>
  `Поле ${property} должно быть строкой`;

export const MAX_LENGTH = ({ property, constraints }: ValidationArguments) =>
  `Поле ${property} не может быть больше ${constraints} символов`;

export const MIN_LENGTH = ({ property, constraints }: ValidationArguments) =>
  `Поле ${property} не может быть меньше ${constraints} символов`;

export const USER_ALREADY_EXIST = 'Пользователь с данным username уже существует';

export const INVALID_CREDENTIALS = 'Направильный логин или пароль';
