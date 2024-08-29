import { nanoid } from "nanoid";

export const generateCustomName = () => nanoid().substring(0, 5);
