import { ErrorBase } from "./base.error";

export class EmailAlreadyExistsError extends ErrorBase {
  constructor(message = "O email informado ja existe") {
    super(409, message);
  }
}