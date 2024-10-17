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
