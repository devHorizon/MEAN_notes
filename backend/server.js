import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Snippet from './models/snippet';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/snippets');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// Fetches all documents.
router.route('/snippets').get((req, res) => {
	Snippet.find((err, snippets) => {
		if (err)
			console.log(err);
		else
			res.json(snippets);
	});
});

// Fetches a single document by _id.
router.route('/snippet/:id').get((req, res) => {
    Snippet.findById(req.params.id, (err, snippet) => {
      if (err)
        console.log(err);
      else
        res.json(snippet);
    });
});

// Adds a document.
router.route('/snippets/add').post((req, res) => {
    let snippet = new Snippet(req.body);
    snippet.save()
      .then(snippet => {
        res.status(200).json({'snippet': 'Added Successfully'});
      })
      .catch(err => {
        res.status(400).send('Failed to create new record');
      });
});

// Updates an existing document.
router.route('/snippet/update/:id').post((req, res) => {
    Snippet.findById(req.params.id, (err, snippet) => {
      if (!snippet)
        return next(new Error('Could not load document'));
      else {
        snippet.title = req.body.title;
        snippet.responsible = req.body.responsible;
        snippet.description = req.body.description;
        snippet.severity = req.body.severity;
        snippet.status = req.body.status;
  
        snippet.save().then(snippet => {
          res.json('Update Complete');
        }).catch(err => {
          res.status(400).send('Update failed');
        });
      }
    });
});


// Deletes a single document by _id.
router.route('/snippets/delete/:id').get((req, res) => {
    Snippet.findByIdAndRemove({_id: req.params.id }, (err, snippet) => {
      if (err)
        res.json(err);
      else
        res.json('Removed Successfully');
    });
});
app.use('/', router);

// Establishes which port the backend runs on.
app.listen(4000, () => console.log('Express server running on port 4000'));
