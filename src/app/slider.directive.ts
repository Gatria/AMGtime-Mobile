import {  Directive, HostListener  } from '@angular/core';
import {BackendService} from './backend.service'

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective {

  constructor(private bksvc:BackendService) { }




  @HostListener('touchstart') touchstart() {
this.bksvc.touch=true
}

@HostListener('touchend') touchend() {
  this.bksvc.touch=false

}

}