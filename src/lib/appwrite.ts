import { Client, Account, Databases } from 'appwrite';
import { environment } from '../environments/environment';
export const client = new Client();

client
  .setEndpoint(environment.API_WRITE)
  .setProject(environment.PROJECT_ID)
export const account = new Account(client);
export const database = new Databases(client);

export { ID, Query } from 'appwrite';
