import { Injectable } from '@angular/core';
import { Client, Account, Databases } from 'appwrite';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppwriteService {

  constructor(
    private readonly client: Client,
    private readonly account: Account,
    private readonly database: Databases
  ) {
    this.client = new Client()
      .setEndpoint(environment.API_WRITE)
      .setProject(environment.PROJECT_ID)
    this.account = new Account(this.client)
    this.database = new Databases(this.client)
  }
}
