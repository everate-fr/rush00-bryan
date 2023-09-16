import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-primary',
  templateUrl: './cta-primary.component.html',
  styleUrls: ['./cta-primary.component.scss']
})
export class CtaPrimaryComponent {

  @Input()
  public text: string = '';

  @Input()
  public disabled: boolean = false;

  public test() {
    this.disabled = !this.disabled;
  }
}
