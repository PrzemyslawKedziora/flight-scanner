import Amadeus from 'amadeus';
import { Router } from 'express';
const router = Router();
const amadeus = new Amadeus({
  clientId: 'GaMH6SEyOHGZOEF6EQu7BDWA4o7mzWQS',
  clientSecret: 'iAeIdAB1SWEcwxoe',
});
router.get(`/city-and-airport-search/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  amadeus.referenceData.locations
      .get({
        keyword: parameter,
        subType: Amadeus.location.any,
      })
      .then(function (response) {
        res.send(response.result);
      })
      .catch(function (response) {
        res.send(response);
      });
});

router.get(`/flight-search`, (req, res) => {
    const originCode = req.query.originCode;
    const destinationCode = req.query.destinationCode;
    const dateOfDeparture = req.query.dateOfDeparture;
    const dateOfReturn = req.query.dateOfReturn;
    const adults = req.query.adults;
    const max = req.query.max;
    const nonStop = false;

    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: dateOfDeparture,
        returnDate: dateOfReturn,
        adults: adults,
        nonStop: nonStop,
        max: max,
    }).then(function (response) {
        res.send(response.result);
    }).catch(function (response) {
        res.send(response);
    });
});

router.post(`/flight-confirmation`, (req, res) => {
    const flight = req.body.flight;
    amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            'data': {
                'type': 'flight-offers-pricing',
                'flightOffers': [flight],
            }
        })
    ).then(function (response) {
        res.send(response.result);
    }).catch(function (response) {
        res.send(response)
    })
});
router.post(`/flight-booking`, (req, res) => {
    const flight = req.body.flight;
    amadeus.shopping.flightOffers.pricing.post(
        JSON.stringify({
            'data': {
                'type': 'flight-offers-pricing',
                'flightOffers': [flight],
            }
        })
    ).then(function (response) {
        res.send(response.result);
    }).catch(function (response) {
        res.send(response)
    })
});

export default router;