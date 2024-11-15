export interface IdentityOwner {
  identity: 'user' | 'shop';
  reqField: 'body' | 'param' | 'query';
  uuidName: string;
}
