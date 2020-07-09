import {  Directive, ElementRef, HostListener  } from '@angular/core';


@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {

  constructor() { }




  @HostListener('touchstart') touchstart() {
this.touch=true
}

@HostListener('touchend') touchend() {
  this.touch=false
}

}