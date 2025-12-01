import { ErrorBase } from "./base.error.js";

export class EmailAlreadyExistsError extends ErrorBase {
  constructor(message = "O email informado ja existe") {
    super(409, message);
  }
}