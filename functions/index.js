// import { API_KEY } from '../src/geocoder.js';

require("../src/geocoder.js");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const Firestore = admin.firestore;
const db = Firestore();

const axios = require("axios");
const cors = require("cors")({ origin: true });

const googleMapsApiKey = process.env.API_KEY_GEOCODE;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.geocodeAddressAndSave = functions.https.onRequest(
  async (request, response) => {
    try {
      const address = request.body.address;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`,
      );
      if(data.status !== "OK") {
        return cors(request, response, () => {
          response.status(200).send("No Results");
        })
      }
      const geocodedLocation = data.results[0];

      const objGeolocatedLocation = {
        address: geocodedLocation.formatted_address,
        getPoint: new admin.firestore.GeoPoint(
          geocodedLocation.geometry.location.lat,
          geocodedLocation.geometry.location.lng,
        ),
      };

      await db.collection('locations').add(objGeolocatedLocation);
      response.status(200).send(objGeolocatedLocation);

    } catch (error) {
      functions.logger.error(error);
      response.status(500).send();
    }
    response.send();
  },
);
