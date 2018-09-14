import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpClient {
  constructor(
    private http: Http
  ) { }

  createHeader(headers: Headers) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      const token = loggedInUser.token;
      headers.append('x-access-token', token);
    }
    headers.append('Content-Type', 'application/json');
  }

  get(url) {
    const headers = new Headers();
    this.createHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    const headers = new Headers();
    this.createHeader(headers);
    return this.http.post(url, data,{
      headers:headers
    });
  }

  put(url, data) {
    const headers = new Headers();
    this.createHeader(headers);
    return this.http.put(url, data);
  }

  delete(url){
    const headers=new Headers();
    this.createHeader(headers);
    return this.http.delete(url,{
      headers:headers
    })

  }
}
