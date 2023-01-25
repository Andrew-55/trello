import { RootState } from "../store";

export const selectorUsername = (state: RootState) => state.user.username;
