interface Role {
  ADMIN: string;
  USER: string;
  AGENT: string;
}

export const role: Role = {
  ADMIN: "ADMIN",
  USER: "USER",
  AGENT: "AGENT",
};


interface Status {
  ACTIVE: string;
  BLOCKED: string;}

export const status: Status = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
};