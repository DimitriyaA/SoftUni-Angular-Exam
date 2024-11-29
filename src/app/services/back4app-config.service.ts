import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Back4AppConfigService {
  public readonly appId: string = '3IbCmt25ZOO4jhU0UvmfHlsWAQwlpMYr9EiiUozi';
  public readonly jsKey: string = 'OQJI7rvBy572nQoIVN9BtdtxnBvQdNtK1NEVn1vH';
  public readonly serverURL: string = 'https://parseapi.back4app.com/';
}
