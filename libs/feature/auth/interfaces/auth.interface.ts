export interface JwtPayload {
  userUuid: string;
  staffUuid?: string;
  customerUuid?: string;
  shopkeeperUuid?: string;
}
