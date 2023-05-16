import { DOCUMENT } from '@angular/common';
import { Directive, OnInit, ElementRef, inject, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit {

  @Input() hinvHover: string = 'bisque';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    this.renderer.setStyle(
    this.element.nativeElement,
    'backgroundColor',
      this.hinvHover);
  } 

  @HostListener('mouseenter') onMouseenter() {
    this.renderer.setStyle(
      this.element.nativeElement, 
      'backgroundColor',
      'green'
    );
  }
  @HostListener('mouseenter') onMouseleave() {
    this.renderer.setStyle(
      this.element.nativeElement, 
      'backgroundColor',
      'white'
    );
  }
}
