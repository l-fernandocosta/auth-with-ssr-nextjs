export class TokenErrors extends Error{
  constructor() {
    super('User token invalid. ')
  }
}