import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  search_word(term) {
  // TODO: send the message _after_ fetching the heroes
  let url= 'http://localhost:3000';
  return this.http.get('http://localhost:3000',{params: term});
}

  getWeather(addr) {
  let url = 'http://localhost:3000/route1';
  return this.http.get('http://localhost:3000/route1',{params: addr});
}

  getWeather2(coord) {
  let url = 'http://localhost:3000/route2';
  return this.http.get('http://localhost:3000/route2',{params: coord});
}
  getSeal(st) {
  return this.http.get('http://localhost:3000/route3',{params: st});
}

getWeekly(weekly_info){
return this.http.get('http://localhost:3000/route4',{params: weekly_info});
}
 
}
