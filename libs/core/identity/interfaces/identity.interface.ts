export interface IdentityData {
  name: string;
  isPublic?: boolean;
}

export interface IdentityFindManyParams {
  where: {
    isPublic?: boolean;
  };
}

export interface IdentityFindUniqueParams {
  where: {
    name: string;
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
