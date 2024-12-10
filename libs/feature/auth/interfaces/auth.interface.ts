export interface JwtPayload {
  userUuid: string;
  staffUuid?: string;
  shopUuids?: string[];
}
