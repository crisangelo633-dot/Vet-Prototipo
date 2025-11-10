import { Directive } from '@angular/core';
import { ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightUpcoming]',
  standalone: false
})
export class HighlightUpcoming {
  @Input('appHighlightUpcoming') startIso?: string;
  private cls = 'highlight-upcoming';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  private update() {
    this.renderer.removeClass(this.el.nativeElement, this.cls);
    if (!this.startIso) return;
    const start = new Date(this.startIso);
    const now = new Date();
    const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    if (start >= now && start <= in24h) {
      this.renderer.addClass(this.el.nativeElement, this.cls);
    }
  }

}
