import * as z from 'zod';
import { loginSchema, registerSchema } from './schema';

export type loginType = z.infer<typeof loginSchema>;
export type registerType = z.infer<typeof registerSchema>;
