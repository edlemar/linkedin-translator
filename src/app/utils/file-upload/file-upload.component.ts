import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  @Output() filesUploaded = new EventEmitter<any>();

  uploading = false;
  uploadProgress = 0;

  constructor(private http: HttpClient) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();

  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      formData.append('files', file);
    }

    console.log(files);

    this.uploading = true;

    // upload the files to the API endpoint
    this.http.post(' http://localhost:3000/api/files/process', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        this.uploading = false;
        this.uploadProgress = 0;
        console.log(event.body);

        // emit the uploaded files
        this.filesUploaded.emit(event.body);
      }
    });
  }

}
