const express = require('express');
const cors = require('cors');

const app = express();
const blogRouter = require('./Controller/index')
const port =process.env.PORT || 5000
app.use(cors());
app.use(express.json());

app.use('/blog', blogRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})