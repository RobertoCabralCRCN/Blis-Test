interface IGetUserAbilitiesResponse {
  data: Array<{
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      created_at: Date;
      updated_at: Date;
    };
    ability: {
      id: string;
      name: string;
      active: boolean;
      created_at: Date;
      updated_at: Date;
    };
    years_experience: number;
    created_at: Date;
    updated_at: Date;
  }>;
  total: number;
  page: number;
  limit: number;
}
