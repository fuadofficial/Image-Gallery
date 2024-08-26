const express = require('express');
const cors = require('cors');
const imageRoute = require('./routes/image')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('public'));

app.use('/api/image', imageRoute)
app.use('*', (req, res) => {
    res.status(400).json({
        message: 'This route is not exist...!'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
