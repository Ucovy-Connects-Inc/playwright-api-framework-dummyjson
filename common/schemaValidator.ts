import Ajv from "ajv";

const ajv = new Ajv();

export const validateSchema = (schema: any, data: any) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw new Error(JSON.stringify(validate.errors));
  }
};