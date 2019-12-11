import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/services/store/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.scss']
})
export class NewContactFormComponent implements OnInit, OnDestroy {
  loading = false;
  newContactForm: FormGroup;
  sink: Subscription[] = [];
  updating = false;
  toBeEditedContact;

  defaultFormValue = {
    profile_photo: '',
    name: '',
    phonenumber: '',
    email: '',
    description: '',
    is_favorite: false,
  }

  constructor(private _contactsService: StoreService, private _snackBarService: MatSnackBar, _formBuilder: FormBuilder) {
    this.newContactForm = _formBuilder.group(this.defaultFormValue)
    this.sink.push(this._contactsService.contacts_to_edit$.subscribe(
      contact => {
        console.log('here')
        if (Object.keys(contact).length < 1) return
        this.newContactForm.reset(contact);
        this.updating = true
        this.toBeEditedContact = contact
      })
    )
  }

  duration = 2000

  onSubmit = () => {
    this.loading = true;
    let action;
    if (this.updating) {
      action = this._contactsService.updateContact({
        ...this.toBeEditedContact,
        ...this.newContactForm.value,
        loading: false,
      })
    } else {
      action = this._contactsService.addContact({
        ...this.newContactForm.value,
        time: new Date(),
        id: `${Math.random() * 1000}`.substring(0, 4),
        loading: false,
      })
    }
    action
      .subscribe({
        error: e => {
          this.loading = false
          this._snackBarService.openFromComponent(SnackbarComponent, {
            duration: this.duration,
            data: { type: 'error', text: 'There was a error' }
          });
        },
        complete: () => {
          this.loading = false
          this._snackBarService.openFromComponent(SnackbarComponent, {
            duration: this.duration,
            data: { type: 'success', text: 'Success' }
          });
          this.newContactForm.reset(this.defaultFormValue)
          this.updating = false
        }
      })
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      //@ts-ignore
      // this.selectedFile = new ImageSnippet(event.target.result, reader.result);
      this.newContactForm.patchValue({ profile_photo: reader.result })
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  resetForm = e => {
    this.updating = false
    this.newContactForm.reset(this.defaultFormValue)
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sink.forEach(i => i.unsubscribe())
  }

}
