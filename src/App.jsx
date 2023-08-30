import "./App.css";

function App() {
  const getLocation = async (onSuccess, onError) => {
    const errorFun = onError
      ? onError
      : (error) => {
          onSuccess();
          console.log({error})
        };
    if (navigator.permissions) {
      const permissions = await navigator?.permissions?.query({
        name: "geolocation",
      });
      console.log("Location permission status: ", permissions.state);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, errorFun, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      onSuccess();
    }
  };

  const handleClick = () => {
    getLocation(submit, error);
  };
  const submit = (location) => {
    console.log({
      location: {
        longitude: location?.coords?.longitude,
        latitude: location?.coords?.latitude,
      },
    });
  };
  const error=(error)=>{
    if (error.code === error.PERMISSION_DENIED) {
      // Display a browser-level permission prompt
      navigator.permissions.query({ name: 'geolocation' }).then(function(permissionStatus) {
        if (permissionStatus.state === 'denied') {
          permissionStatus.onchange = function() {
            if (permissionStatus.state === 'granted') {
              // The user granted permission, handle location data
              console.log("Thank you for allowing location access!");
            }
          };
          permissionStatus.prompt(); // Trigger the browser-level prompt
        }
      });
    } else {
      // Handle other geolocation errors here
      alert("An error occurred while trying to get your location.");
    }
  }

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleClick}>Allow permission</button>
    </>
  );
}

export default App;
