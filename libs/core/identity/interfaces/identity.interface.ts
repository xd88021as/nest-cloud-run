export interface IdentityData {
  name: string;
}

export interface IdentityFindUniqueParams {
  where: {
    id?: number;
    name?: string;
  };
}

//user-identity

export interface UserIdentityData {
  identityId: number;
  userId: number;
}

export interface UserIdentityFindManyParams {
  where: {
    identityId?: number;
    userId?: number;
  };
}

export interface UserIdentityFindUniqueParams {
  where: {
    uuid: string;
  };
}
