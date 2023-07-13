import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  labels: {name: string, color: string}[] = [
    {name: 'Swift', color: 'red'},
    {name: 'Objective-C', color: 'blue'},
    ];
  text: string = "3+ years Swift & Objective-C and experience with iOS internals Experience building an entire app from scratch and ideally a portfolio of apps featured in the App Store Someone who knows every trick in the book on UI transitions, network communication and memory/battery efficiency Strong UI/design skill experience is a plus";
  selectedText: string [] =  [];
  selection: Selection[] = [];
  result: {document: string, annotation: {start: number, end: number, label: string, text: string}[]} = {document: '', annotation: []};
  isExport: boolean = false;
  getSelectedText(event: any) {
    const selection = window.getSelection();
    this.selection.push(selection!);
    const selectedText = selection!.toString();
    const range = this.text.indexOf(selectedText);
    this.selectedText.push(selectedText);
    console.log(selectedText, range, range + selectedText.length);
  }
  changeSelectedText(color: string, name: string) {
    const span = document.createElement('span');
    span.style.backgroundColor = color;
    span.style.color = 'white';
    span.textContent = this.selectedText[this.selectedText.length - 1]+ ":" +  name ;
    const range = this.selection[this.selection.length - 1].getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
    const start = this.text.indexOf(this.selectedText[this.selectedText.length - 1]);
    const end = start + this.selectedText[this.selectedText.length - 1].length;
    this.result.annotation.push({start: start, end: end, label: name, text: this.selectedText[this.selectedText.length - 1]});

  }
  exportResult() {
    this.result.document = this.text;
    this.isExport = true;
  }
}
