const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const member = require('./Member');

const app = express();

// Init middleware
// app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false }))

// ? Not good, because you have to insert all 1 by 1 (which is not good)
// app.get('/', (req, res) => {
// res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Member api routes
app.use('/api/members', require('./routes/api/members'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
