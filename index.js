const express = require('express');
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
const sdk = require('api')('@intercom-api-reference/v2.9#v67gwo2lhkg10ra');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialise SDK
sdk.auth(process.env.INTERCOM_ACCESS_TOKEN);

app.post('/api/tickets', async (req, res) => {
  // post request to create ticket
  sdk.postTickets({
    ticket_attributes: {_default_title_: req.body.ticket_title, _default_description_: req.body.ticket_body},
    contacts: [{email: req.body.email}],
    ticket_type_id: req.body.ticket_type
  })
    .then(({ data }) => console.log(data), res.send('Ticket created!'))
    .catch(err => console.error(err), res.send('Problem creating your ticket :('));
});


app.get('/api/tickets', async (req, res) => {
  // initialise SDK
  sdk.auth(process.env.INTERCOM_ACCESS_TOKEN);
  
  // get ticket data
  sdk.server('https://api.intercom.io');
  const ticketData = await sdk.getTicketsId({id: '1', 'intercom-version': '2.9'}).
  then(response => { return response.data })
  .catch(err => console.error(err));

  // format ticket data to send to client
  const ticketDisplay = {'title': ticketData.ticket_attributes._default_title_,
                         'description': ticketData.ticket_attributes._default_description_,  
                         'id': ticketData.id}
  
  // send ticket data to client
  res.status(200).json(ticketDisplay)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})