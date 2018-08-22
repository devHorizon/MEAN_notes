import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SnippetService {
  // Backend Server URI
  // Set in /backend/server.js
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }
  // The name of your MongoDB database collection.
  collection = 'snippet';

  // Fetches all documents.
  getSnippets() {
    return this.http.get(`${this.uri}/${this.collection}`);
  }

  // Fetches a single document by _id.
  getSnippetById(id) {
    return this.http.get(`${this.uri}/${this.collection}/${id}`);
  }

  // Creates a new document.
  addSnippet(title, resposible, description, severity) {
    const snippet = {
      title: title,
      responsible: resposible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/${this.collection}/add`, snippet);
  }

  // Updates an existing document.
  updateSnippet(id, title, resposible, description, severity, status) {
    const snippet = {
      title: title,
      responsible: resposible,
      description: description,
      severity: severity,
      status: status
    };
    return this.http.post(`${this.uri}/${this.collection}/update/${id}`, snippet);
  }

  // Deletes an existing document.
  deleteSnippet(id) {
    return this.http.get(`${this.uri}/${this.collection}/delete/${id}`);
  }
}
