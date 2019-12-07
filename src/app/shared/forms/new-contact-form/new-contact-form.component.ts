import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.scss']
})
export class NewContactFormComponent implements OnInit {
  selectedFile: ImageSnippet;

  // constructor() {
  //   this.selectedFile : ImageSnippet;
  // }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      //@ts-ignore
      this.selectedFile = new ImageSnippet(event.target.result, reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  ngOnInit() {
  }

}
