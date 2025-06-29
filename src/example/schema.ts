import {
  petSchema,
  userReferences,
  userSchema,
  petReferences,
} from "./user.js";

const schemas = {
  user: { ...userSchema, ...userReferences },
  pet: { ...petSchema, ...petReferences },
};

export { schemas };
