import { Request, Response, NextFunction } from "express";

import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    //
    try {
      schema.parse({
        body: request.body,
        query: request.query,
        params: request.params,
      });
    } catch (error: any) {
      return response.status(400).send(error.errors);
    }
  };
export default validate;
