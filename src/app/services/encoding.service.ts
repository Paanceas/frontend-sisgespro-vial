import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
@Injectable({
  providedIn: 'root'
})
export class EncodingService {

  constructor() { }

  encoding(value:string):string{
    return sha256(value);
  }

}
