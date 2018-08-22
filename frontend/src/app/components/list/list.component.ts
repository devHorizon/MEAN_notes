import { Component, OnInit } from '@angular/core';
import { SnippetService } from '../../services/snippet.service';
import { Snippet } from '../../models/snippet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  
  snippets: Snippet[];
  columns = ['Title', 'Responsible', 'Description', 'Severity', 'Status', 'Actions'];

  constructor(private snippetService: SnippetService, private router: Router) { }

  ngOnInit() {
    this.fetchSnippets();
  }

   // Fetches all documents.
 fetchSnippets() {
  this.snippetService
    .getSnippets() //yes
    .subscribe((data: Snippet[]) => {
      this.snippets = data;
      console.log('Data Requested');
      console.log(this.snippets);
    });
  }

  // Redirects to the /edit route.
editSnippet(id) {
  this.router.navigate([`/edit/${id}`]);
}

// Deletes the selected snippet and refreshes the document view.
deleteSnippet(id) {
  this.snippetService.deleteSnippet(id).subscribe(() => {
    this.fetchSnippets();
  });
}
}
