import React from "react";
import {
  defaults,
  FormManagerOptions,
  FormProps,
  useFormManager,
} from "../../lib";

export const useStoryFormProps = <T extends unknown>(
  options: FormManagerOptions<T>,
): FormProps<T | undefined> => {
  console.log("useStoryFormProps", options);
  const manager = useFormManager<T, FormManagerOptions<T>>({
    ...options,
    registry: defaults.registry,
  });
  return {
    manager,
    children: (
      <div style={{ marginTop: "1rem" }}>
        <button type="submit">
          {manager.isSubmitted ? "Submit again" : "Submit"}{" "}
          {manager.isValid ? "valid" : "invalid"}
        </button>
      </div>
    ),
  };
};
