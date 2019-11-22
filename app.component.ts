import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AddressService } from './address.service';
import { Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import * as CanvasJS from './node_modules/canvasjs/canvasjs.min';
import { MatTabChangeEvent } from '@angular/material';
import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {

bar_clicked:boolean;
latlongtime_str={};
CanvasJS : any;
received=false;
searchResult=[];
addressForm: FormGroup;
values: any;
lat: number;
long: number;
latlong_str={};
state_str: any;
latlong: any;
try_it:string;
tzone:string;
temp:number;
summ:string;
seal:string;
humidity:number;
pressure:number;
windSpeed:number;
visibility:number;
cloudCover:number;
ozone:number;
optionValue='temp';

arr:number[]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
hourly_weather=[];
hourly_pressure=[];
hourly_humidity=[];
hourly_ozone=[];
hourly_visibility=[];
hourly_windSpeed=[];
optionChose=[];
weekly_time:number[];
weekly_tempLow=[];
weekly_tempHigh=[];
daily_weather:number;
daily_summary:string;
daily_icon:any;
daily_precipI:number;
daily_precipP:number;
daily_windspeed:number;
daily_humidity:number;
daily_visibility:number;

onSelectChange(event) {
    if(event.index== 2){
	this.renderChart();	
    }
  }

  public barChartOptions:{
    scaleShowVerticalLines:boolean,
    responsive:boolean,
    scales:{
        xAxes: [{
            scaleLabel: {
                display: boolean,
                labelString:string,
                fontSize:number
            }
        }]
        yAxes: [{
            display:boolean,
            scaleLabel: {
                display: boolean,
                labelString:string,
                fontSize:number
            }
            ticks:{
                suggestedMax:number,
                suggestedMin:number,
                }
       }]
  }
  };

  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels = this.arr;
  public barChartData:any[];

  canvasChartData: any;
  canvasChartDataCopy: number[];
  canvasChart: any;
  canvasChartContext: any;


constructor(private addressService: AddressService) {} 

ngOnInit(){
   this.addressForm = new FormGroup({
    Street: new FormControl('',Validators.required),
    City: new FormControl('',Validators.required),
    State: new FormControl('',Validators.required)
})

this.addressForm.controls['City'].valueChanges
     .subscribe(data  => {
  // TODO: "Use EventEmitter with form value
  this.addressService.search_word(data).subscribe((response:any) => {
var ids = [];
for (let i = 0; i < response.predictions.length;i++){
         ids.push(response.predictions[i].structured_formatting.main_text);
}
this.searchResult=ids;
})
})

this.values = [

{ Abbreviation : "AL" ,State : "Alabama" }, { Abbreviation : "AK",State : "Alaska" }, { Abbreviation : "AZ" ,State : "Arizona" }, { Abbreviation : "AR" ,State : "Arkansas" }, { Abbreviation : "CA" ,State : "California" }, { Abbreviation : "CO" ,State : "Colorado" }, { Abbreviation : "CT" ,State : "Connecticut" }, { Abbreviation : "DE" ,State : "Delaware" }, { Abbreviation : "DC" ,State : "District Of Columbia" }, { Abbreviation : "FL" ,State : "Florida" }, { Abbreviation : "GA" ,State : "Georgia" }, { Abbreviation : "HI" ,State : "Hawaii" }, { Abbreviation : "ID" ,State : "Idaho" }, { Abbreviation : "IL" ,State : "Illinois" }, { Abbreviation : "IN" ,State : "Indiana" }, { Abbreviation : "IA" ,State : "Iowa" }, { Abbreviation :"KS" ,State :"Kansas" }, { Abbreviation :"KY" ,State :"Kentucky" }, { Abbreviation :"LA" ,State :"Louisiana" }, { Abbreviation :"ME" ,State :"Maine" }, { Abbreviation : "MD" ,State : "Maryland" }, { Abbreviation : "MA" ,State : "Massachusetts" }, { Abbreviation : "MI" ,State : "Michigan" }, { Abbreviation : "MN" ,State : "Minnesota" }, { Abbreviation : "MS" ,State : "Mississippi" }, {Abbreviation : "MO" ,State : "Missouri" },{ Abbreviation : "MT" ,State : "Montana" }, { Abbreviation : "NE" ,State : "Nebraska" }, { Abbreviation : "NV" ,State : "Nevada" }, { Abbreviation : "NH" ,State : "New Hampshire" }, { Abbreviation : "NJ" ,State : "New Jersey" }, { Abbreviation : "NM" ,State :"New Mexico" }, { Abbreviation : "NY" ,State : "New York"}, { Abbreviation : "NC" ,State : "North Carolina" }, { Abbreviation : "ND" ,State : "North Dakota" }, { Abbreviation : "OH" ,State : "Ohio" }, { Abbreviation : "OK" ,State : "Oklahoma" }, { Abbreviation : "OR" ,State : "Oregon" }, { Abbreviation : "PA" ,State : "Pennsylvania" }, { Abbreviation : "RI" ,State : "Rhode Island" }, { Abbreviation : "SC" ,State : "South Carolina" }, { Abbreviation : "SD" ,State : "South Dakota" }, { Abbreviation : "TN" ,State : "Tennessee" }, { Abbreviation : "TX" ,State : "Texas" }, { Abbreviation : "UT" ,State : "Utah"}, { Abbreviation : "VT" ,State : "Vermont" }, { Abbreviation : "VA" ,State : "Virginia" }, { Abbreviation : "WA" ,State : "Washington" }, { Abbreviation : "WV" ,State : "West Virginia" }, { Abbreviation : "WI" ,State : "Wisconsin" }, { Abbreviation : "WY" ,State : "Wyoming"} ];
}

onSubmit(){
  var result= this.addressForm.value;

  this.addressService.getWeather(result).subscribe((response:any) => {
  this.lat = response.results[0].geometry.location.lat;
  this.long = response.results[0].geometry.location.lng;
  this.latlong_str = {
  latitude: this.lat, 
  longitude:this.long 
  };

  this.addressService.getWeather2(this.latlong_str).subscribe((response:any) => {
  this.tzone=response.timezone;
  var temp1=response.currently.temperature;
  this.temp=temp1.toFixed();
  this.summ=response.currently.summary;
  this.humidity=response.currently.humidity;
  this.pressure=response.currently.pressure;
  this.windSpeed=response.currently.windSpeed;
  this.visibility=response.currently.visibility;
  this.cloudCover=response.currently.cloudCover;
  this.ozone=response.currently.ozone;
  this.hourly_weather=[];this.hourly_pressure=[];this.hourly_humidity=[];this.hourly_ozone=[];this.hourly_visibility=[];this.hourly_windSpeed=[];
  for (let i = 0; i < 24;i++){
        this.hourly_weather.push(Math.round(Number(response.hourly.data[i].temperature)));
        this.hourly_pressure.push(Number(response.hourly.data[i].pressure));
 	this.hourly_humidity.push(Math.round(Number(response.hourly.data[i].humidity)*100));
 	this.hourly_ozone.push(Number(response.hourly.data[i].ozone));
 	this.hourly_visibility.push(Number(response.hourly.data[i].visibility));
 	this.hourly_windSpeed.push(Number(response.hourly.data[i].windSpeed));
   }

  this.weekly_time=[];this.weekly_tempHigh=[];this.weekly_tempLow=[];
  for (let i = 0; i < 7;i++){
        this.weekly_time.push(Number(response.daily.data[i].time)*1000);
        this.weekly_tempLow.push(Math.round(Number(response.daily.data[i].temperatureLow)));
        this.weekly_tempHigh.push(Math.round(Number(response.daily.data[i].temperatureHigh)));
   }

  this.updateChart();
  })
})  
  const state_str={id: this.addressForm.controls['State'].value}; 
  this.addressService.getSeal(state_str).subscribe((response:any) => {
  this.seal=response.items[0].link;
  })

setTimeout(() => {
  this.received=true;
}, 1000);

}

resetForms() {
this.ngOnInit();
this.addressForm.reset();
}

updateChart() {
  if (this.optionValue=="temp") {this.optionChose=this.hourly_weather;this.barChartData=[{data:this.optionChose,label:'temperature'}];var optionLabel="Farenheit"}
  if (this.optionValue=="pres") {this.optionChose=this.hourly_pressure;this.barChartData=[{data:this.optionChose,label:'pressure'}];var optionLabel="Millibars"}
  if (this.optionValue=="humid") {this.optionChose=this.hourly_humidity;this.barChartData=[{data:this.optionChose,label:'humidity'}];var optionLabel="% Humidity"}
  if (this.optionValue=="ozone") {this.optionChose=this.hourly_ozone;this.barChartData=[{data:this.optionChose,label:'ozone'}];var optionLabel="Dobson Units"}
  if (this.optionValue=="vis") {this.optionChose=this.hourly_visibility;this.barChartData=[{data:this.optionChose,label:'visibility'}];var optionLabel="Miles (Maximum 10)"}
  if (this.optionValue=="wind") {this.optionChose=this.hourly_windSpeed;this.barChartData=[{data:this.optionChose,label:'windSpeed'}];var optionLabel="Miles per Hour"}
  this.barChartOptions={
    scaleShowVerticalLines:false,
    responsive:true,
    scales: {
	xAxes: [{
	  scaleLabel: {
	    display: true,
	    labelString: 'Time difference from current hour',
	    fontSize:15
	  },
	}],
        yAxes: [{
          display:true,
          scaleLabel: {
            display: true,
	    labelString: optionLabel,
	    fontSize:14
          },
          ticks:{
                suggestedMin: (Math.min.apply(this,this.optionChose)-(Math.max.apply(this,this.optionChose)-Math.min.apply(this,this.optionChose)))>0?Math.min.apply(this,this.optionChose)-(Math.max.apply(this,this.optionChose)-Math.min.apply(this,this.optionChose)):0,
                suggestedMax: Math.max.apply(this,this.optionChose)+(Math.max.apply(this,this.optionChose)-Math.min.apply(this,this.optionChose))
                }
        }]
    }
  };
}

renderChart() {
var addressService=this.addressService;
        CanvasJS.addColorSet("blueShades",
                [//colorSet Array

                "#ADCFEB"                
                ]);
        var chart = new CanvasJS.Chart("canvasjsContainer", {
 		colorSet: "blueShades",
		title: {
			text: "Weekly Weather"
		},
		dataPointWidth: 20,
		axisX: {
			labelFormatter: function (e) {
				return CanvasJS.formatDate(e.value, "DD/MM/YYYY");
			},
			includeZero:false
			},
 		axisY:  {
			includeZero:false
			}, 
		data: [{
			type: "rangeBar",
			xValueType: "dateTime",
		click: onClick,
		dataPoints: [
			{ x: this.weekly_time[0], y:[this.weekly_tempLow[0], this.weekly_tempHigh[0]]},
			{ x: this.weekly_time[1], y:[this.weekly_tempLow[1], this.weekly_tempHigh[1]]},
			{ x: this.weekly_time[2], y:[this.weekly_tempLow[2], this.weekly_tempHigh[2]]},
			{ x: this.weekly_time[3], y:[this.weekly_tempLow[3], this.weekly_tempHigh[3]]},
			{ x: this.weekly_time[4], y:[this.weekly_tempLow[4], this.weekly_tempHigh[4]]},
			{ x: this.weekly_time[5], y:[this.weekly_tempLow[5], this.weekly_tempHigh[5]]},
			{ x: this.weekly_time[6], y:[this.weekly_tempLow[6], this.weekly_tempHigh[6]]},
		]
		}]
	});
  chart.render(); 
	var newlat=this.lat;
	var newlong=this.long;
	function onClick(e) {
		this.bar_clicked=true;
	        this.latlongtime_str = {
                latitude: newlat,
                longitude: newlong,
		wtime:e.dataPoint.x/1000
                }
addressService.getWeekly(this.latlongtime_str).subscribe((response:any) => {
  this.daily_weather=response.currently.temperature;
  this.daily_summary=response.currently.summary;
  this.daily_icon=response.currently.icon;
  this.daily_precipI=response.currently.precipIntensity;
  this.daily_precipP=response.currently.precipProbability;
  this.daily_windspeed=response.currently.windSpeed;
  this.daily_humidity=response.currently.humidity;
  this.daily_visibility=response.currently.visibility;

  document.getElementById("myModal").style.display = "block";
})
}

}

closeModal(){
document.getElementById("myModal").style.display = "none";
}

}
