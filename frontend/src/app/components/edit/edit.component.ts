import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../services/snippet.service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  id: String;
  snippet: any = {};
  updateForm: FormGroup;

  constructor(private snippetService: SnippetService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { 
    //this.createForm();
              }
/*
  // Creates the updateForm schema with validations.
  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
  }
*/
  ngOnInit() {
  // Autopopulates the input fields with the selected document data.
  this.route.params.subscribe(params => {
    this.id = params.id;
    this.snippetService.getSnippetById(this.id).subscribe(res => {
      this.snippet = res;
      this.updateForm.get('title').setValue(this.snippet.title);
      this.updateForm.get('responsible').setValue(this.snippet.responsible);
      this.updateForm.get('description').setValue(this.snippet.description);
      this.updateForm.get('severity').setValue(this.snippet.severity);
      this.updateForm.get('status').setValue(this.snippet.status);
    });
  });
}
/*
  // Updates the document with input data and redirects to the /list route.
  updateSnippet(title, responsible, description, severity, status) {
    this.snippetService.updateSnippet(this.id, title, responsible, description, severity,
    status).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }*/
  };