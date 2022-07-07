import { Validity } from "../models";

export const checkValidity = (validity: Validity) => {
  const check = (v) =>
    !v ||
    typeof v !== "object" ||
    Object.keys(v).reduce(
      (prev, curr) => prev && check(v[curr]),
      !Array.isArray(v.errors) || v.errors.length < 1,
    );
  return check(validity);
};
