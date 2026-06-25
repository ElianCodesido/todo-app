import { HttpError } from "../errors/HttpError.js";
export const textValidation = (text, maxCharacters) => {
  if (typeof text !== "string") {
    throw new HttpError(400, "Text must be a string.");
  }
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    throw new HttpError(
      400,
      "Text must contain at least one non-space character.",
    );
  }

  if (trimmed.length > maxCharacters) {
    throw new HttpError(
      400,
      `Text must be at most ${maxCharacters} characters long.`,
    );
  }

  return trimmed;
};
