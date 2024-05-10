import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as _ from 'lodash';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';
  cityName = ''
  tempCities : any = []
  temparatures : any = []
  groupedWeatherData : any = []
  tempDayData : any =[]
  constructor(private http :  HttpClient){

  }
  searchFn(_city : any){
    this.tempDayData = []
    const _url =  `https://openweathermap.org/data/2.5/find?q=${_city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`
    this.http.get(_url).subscribe((data : any) => {
      this.tempCities = data.list
      console.log('cities data', this.tempCities)
    })

  }
  // api.openweathermap.org/data/2.5/forecast?lat=17.4237&lon=78.4584&appid=1635890035cbba097fd5c26c8ea672a1
  selCity(_city : any){
    const _cityUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${_city.coord.lat}&lon=${_city.coord.lon}&appid=1635890035cbba097fd5c26c8ea672a1`
    this.http.get(_cityUrl).subscribe((temp : any) => {
      this.temparatures = temp.list
      this.groupWeatherData(this.temparatures);

      console.log('temperature data', this.temparatures)
    })
    this.tempCities = []
  }

  groupWeatherData(_data: any) {
    this.groupedWeatherData = _.groupBy(_data, (weather: any) => {
      const date = new Date(weather.dt * 1000); // Convert timestamp to date object
      return date.toISOString().split('T')[0]; // Extract date in 'YYYY-MM-DD' format
    });
    this.tempDayData = _.map(this.groupedWeatherData, (items, date) => {
      return {  items :  items[0]};
    });
    console.log('final temp' , this.tempDayData)
  }
  
  
}
