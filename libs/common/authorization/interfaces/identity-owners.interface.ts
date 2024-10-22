export interface IdentityOwner {
  identity: 'staff' | 'user' | 'customer' | 'shopkeeper';
  reqField: 'body' | 'param' | 'query';
  uuidName: string;
}
