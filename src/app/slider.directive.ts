import {  Directive, HostListener  } from '@angular/core';
import {BackendService} from './backend.service'

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {

  constructor() { }




  @HostListener('touchstart') touchstart() {
this.touch=true
console.log(this.touch)
}

@HostListener('touchend') touchend() {
  this.touch=false
  console.log(this.touch)
}

}