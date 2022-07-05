import { jsx } from "@theme-ui/core";
import { createFormStory, formStoryMeta } from "../../../../../docs/utils";
import { Box } from "../../../containers";
import { AutocompleteOptionsInit } from "./AutocompleteField";

export default {
  ...formStoryMeta,
  title: "JsForm/Autocomplete",
};

const oneOf = [
  {
    title: "A",
    const: "aaa",
  },
  {
    title: "B",
    const: "bbb",
  },
  {
    title: "C",
    const: "ccc",
  },
];

export const Basics = createFormStory({
  schema: {
    type: "object",
    properties: {
      single: {
        type: "string",
        title: "Autocomplete (single)",
        oneOf,
        layout: { field: "autocomplete" },
      },
      multiple: {
        type: "array",
        title: "Autocomplete (multiple)",
        items: { oneOf },
        layout: { field: "autocomplete" },
      },
    },
  },
  initialValue: {},
});

export const InitialValue = createFormStory({
  schema: {
    type: "string",
    title: "With default value",
    oneOf,
    layout: { field: "autocomplete" },
  },
  initialValue: "aaa",
});

export const InitialValueWithoutOption = createFormStory({
  schema: {
    type: "string",
    title: "With default value",
    oneOf: [],
    layout: { field: "autocomplete" },
  },
  initialValue: "aaa",
});

export const CustomOptions = createFormStory({
  schema: {
    type: "array",
    title: "With custom options",
    layout: {
      field: "autocomplete",
      target: "ANY_VALUE",
    },
  },
  initialValue: ["aaa"],
  registry: {
    utils: {
      getAutocompleteOptions: (
        { target: _, query, value }: AutocompleteOptionsInit,
      ) => {
        if (Array.isArray(value)) {
          return [{
            title: `Initial title for "${value[0]}"`,
            const: value[0],
          }];
        }
        return fetch(`https://jsonplaceholder.typicode.com/users?q=${query}`)
          .then((v) => v.json())
          .then((v) =>
            v.map((t) => ({
              title: t.name,
              const: t.id,
            }))
          )
          .catch(() => []);
      },
    },
  },
});
