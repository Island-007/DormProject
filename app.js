const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const router = require('./router');
const dbGenerator = require('./db/db_generator');
const errorHandler = require('./middleware/error-handler');

const app = express()
const port = process.env.PORT || 3000

// dbGenerator();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());

app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
