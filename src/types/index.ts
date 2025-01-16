import { z } from "zod";
import {
  authSchema,
  noteSchema,
  projectFormDataSchema,
  projectSchema,
  taskFormData,
  taskProjectSchema,
  taskSchema,
  TaskStatusSchema,
  teamMemberSchema,
  userSchema,
} from "@schemas";

/** Auth */
export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;
export type ConfirmToken = Pick<Auth, "token">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;
export type UpdateCurrentUSerPasswordForm = Pick<Auth, "current_password" | "password" | "password_confirmation">;
export type CheckPasswordForm = Pick<Auth, 'password'>;

/** Users */
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>

/** Projects */
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = z.infer<typeof projectFormDataSchema>;

/** Notes */
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

/** Tasks */
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = z.infer<typeof taskFormData>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type TaskProject = z.infer<typeof taskProjectSchema>

/** Team */
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberFormData = Pick<TeamMember, 'email'>;
