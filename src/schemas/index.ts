import { z } from "zod";

/** Auth */
export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

/** Users */
export const userSchema = authSchema.pick({
  name: true,
  email: true,
}).extend({
    _id: z.string()
});

/** Notes */
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema.pick({ _id: true, name: true }),
  task: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
})

/** Tasks */
export const TaskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: TaskStatusSchema,
  notes: z.array(noteSchema),
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema.pick({ _id: true, name: true }),
      status: TaskStatusSchema,
      updatedAt: z.string()
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskFormData = taskSchema.pick({
  name: true,
  description: true,
});

export const taskProjectSchema = taskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true
});

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(taskProjectSchema),
  manager: z.string(userSchema.pick({ _id: true })),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
});

export const projectFormDataSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

export const dashboardSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
  })
);

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true
});

/** Team */
export const teamMemberSchema = userSchema.pick({
  name: true,
  email:true,
  _id: true
});

export const teamMembersSchema = z.array(teamMemberSchema)