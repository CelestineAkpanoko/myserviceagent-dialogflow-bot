const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
const path = require('path');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 4000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/myserviceagent', (request, response) => {
    dialogflowFulfillment(request, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

   
    function inquiryText(agent){
        agent.add("Thank you. To serve you better we will need some details from you real quick.")
        agent.add("What is your name?")
        // agent.setFollowupEvent('trigger_name_query')
    }
    

    let intentMap = new Map();
    intentMap.set("inquiry", inquiryText)
    agent.handleRequest(intentMap)

}