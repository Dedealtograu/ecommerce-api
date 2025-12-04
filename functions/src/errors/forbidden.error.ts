import { ErrorBase } from "./base.error.js";

export class ForbiddenError extends ErrorBase {
  constructor(message = 'Não autorizado para realizar essa operação') {
    super(403, message);
  }
}