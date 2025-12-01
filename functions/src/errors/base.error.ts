import { Response } from "express";

export class ErrorBase extends Error {
  constructor(private statusCode: number, message: string) {
    super(message);
  }

  send(res: Response) {
    res.status(this.statusCode).send({ message: this.message });
  }
}