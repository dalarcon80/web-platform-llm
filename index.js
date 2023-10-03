// Enter your token server url to connect to your project
// NOTE: your token server must allow requests from 'https://web-platform-9chn6x.stackblitz.io'
//const tokenServer = 'http://localhost:5001/auth/authorize';

// Note that your API key must allow requests from
// this StackBlitz demo: 'https://web-platform-9chn6x.stackblitz.io'
// Note that the URL will change if you fork this project
const apiKey =
  'eyJzb3VsSWQiOiJkZG5hLWRhbmllbC1hbGFyY29uLS1kaWdpdGFsLWNoaWVmLWV4cGVyaWVuY2UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9lNmYxZTA3OS00ODI1LTQ2YjUtYjE5ZC05YjEwYzRjNDUzNjEifQ==';

let scene;

/**
 * Start a new connection.
 * Request a JWT from the token server and use it
 * to connect to the Soul Machines session server.
 */
async function connect() {
  // get the video element
  const videoEl = document.getElementById('sm-video');

  // create a new scene object
  scene = new Scene({
    apiKey: apiKey,
    videoElement: videoEl,
    requestedMediaDevices: { microphone: true, camera: true },
    requiredMediaDevices: { microphone: true, camera: true },
  });

  // connect the Scene to the session server
  await scene
    .connect()
    .then((sessionId) => onConnectionSuccess(sessionId))
    .catch((error) => onConnectionError(error));
}

/**
 * Handle successful connection
 * On success, we must start the video.
 */
function onConnectionSuccess(sessionId) {
  console.info('success! session id:', sessionId);

  // start the video playing
  scene
    .startVideo()
    .then((videoState) => console.info('started video with state:', videoState))
    .catch((error) => console.warn('could not start video:', error));
}

/**
 * Handle failed connection
 * On error, we must display some feedback to the user
 */
function onConnectionError(error) {
  switch (error.name) {
    case 'noUserMedia':
      console.warn('user blocked device access');
      break;
    case 'noScene':
    case 'serverConnectionFailed':
      console.warn('server connection failed');
      break;
    default:
      console.warn('unhandled error:', error);
  }
}

/**
 * Event listeners for button in the HTML
 */

const connectButton = document.getElementById('connect-button');
connectButton.addEventListener('click', () => connect());

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => (window.location = '/'));
