import { createEvent, createStore, createEffect } from 'effector';
import {User} from "../types/data";

export const $login = createEvent<{email: string; password: string}>()
export const $logout = createEvent()
export const $fetchUserFx = createEffect<{ email: string; password: string }, User>()

