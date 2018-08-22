import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../services/snippet.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private snippetService: SnippetService, 
              private fb: FormBuilder, 
              private router: Router) { 
  
                // Creates the createForm schema with validations.
  this.createForm = this.fb.group({
    title: ['', Validators.required],
    responsible: '',
    description: '',
    severity: ''
  });
              }

  ngOnInit() {
  }

  // Adds a new document with the entered data and redirects to the /list route.
addSnippet(title, responsible, description, severity) {
  this.snippetService.addSnippet(title, responsible, description, severity).subscribe(() => {
    this.router.navigate(['/list']);
   });
}
}
