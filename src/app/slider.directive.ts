import {  Directive, HostListener  } from '@angular/core';
import {BackendService} from './backend.service'

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {

  constructor(public bksvc:BackendService) { }


@HostListener('contextmenu', ['$event'])
onRightClick(event) {
  event.preventDefault();
}

  @HostListener('touchstart') touchstart() {
this.bksvc.touch=true
}

@HostListener('touchend') touchend() {
  this.bksvc.touch=false

}

}