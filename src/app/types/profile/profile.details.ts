interface Skill {
  id: number;
  user_id: number;
  skill: string;
  rating?: number;
}

export interface Profile {
  id: number;
  email: string;
  designation: string;
  team_name: string;
  organization_name: string;
  name: string;
  skills?: Array<Skill>;
}
