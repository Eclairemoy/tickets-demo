# Tickets Demo
This demo is a (very ugly) web form that will allow you to submit tickets directly to Intercom, via the Tickets API. Based on the [Ruby Tutorial](https://developers.intercom.com/building-apps/docs/build-a-ticket-form-with-tickets-api) from the Intercom Developer Hub.

It will also pull existing ticket data. This assumes you have submitted previous data and requires you to specify the data by ID, but next steps would be to get all available ticket data or provide UI functionality to let you search/filter.

## Requirements

- [Nodejs 20+](https://nodejs.org/en)


## Setup

1. Clone this repository
2. Rename the `.env.example` file to `.env`
3. Add the example Intercom token to the `.env` file
5. Run `npm install` 
6. Run `npm run dev` to start the server
7. Visit localhost `8080` to see the app
