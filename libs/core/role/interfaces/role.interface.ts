export interface RoleData {
  name: string;
  isPublic?: boolean;
}

export interface RoleFindManyParams {
  where: {
    isPublic?: boolean;
  };
}

export interface RoleFindUniqueParams {
  where: {
    name: string;
  };
}
