const express = require('express');
const app = express();
const port = 3003;
app.get('/',(req,res)=>{
    res.send("Hello world!!!");
})

app.get('/api/cources', (req,res) => {
    res.send([1,2,3]);
})

app.listen(port, ()=>{console.log(`Listning on port ${port}...`)});