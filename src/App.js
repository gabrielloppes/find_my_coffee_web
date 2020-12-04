import React, { Fragment, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import EstablishmentsService from './services/google_list_of_establishments';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [location, setLocations] = useState([]);

  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  // useEffect will trigger setCurrentLocation function
  // We pass an empty array, so the function will be called just once
  useEffect(() => {
    setCurrentLocation();
  }, []);

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        loadCoffeeShops();
      },
      function (error) {
        alert('Habilite a locaização para usar este app');
      }
    );
  }

  async function loadCoffeeShops() {
    const response = await EstablishmentsService.index(latitude, longitude);
    setLocations(response.data.results);
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        >
          {locations.map((item, index) => {
            return (
              <Marker
                key={index}
                icon={}
                title={item.name}
                animation="4"
                position={{
                  lat: item.geometry.location.lat,
                  lng: item.geometry.location.lng,
                }}
              />
            );
          })}
          <Marker
            key="my location"
            icon={}
            title="seu local"
            animation="2"
            position={{ lat: latitude, lng: longitude }}
          />
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;
