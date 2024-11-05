import { Component, Input, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = "";

  @Output()
  private onValue: EventEmitter<string> = new EventEmitter();

  @ViewChild("txtInput")
  private txtInput!: ElementRef<HTMLInputElement>;

  public EmitValue(): void {
    const inputValue: string = this.txtInput.nativeElement.value;

    if (inputValue.length <= 0) return;

    this.onValue.emit(inputValue);
  }
}
