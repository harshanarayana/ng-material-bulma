interface SkillMap {
  skill: string; // Type of the Skill possessed by the given user
  rating: number; // Rating for the given skill on integer scale.
}

/**
 * Type definition for the API endpoint POST request that will be
 * used for storing the User Data into the Sqlite3 tables.
 */
export default interface CreateUserRequest {
  name: string;
  email: string;
  designation: string;
  teamName: string;
  orgName: string;
  skills: SkillMap[];
}
