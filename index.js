const apiKey =
  'eyJzb3VsSWQiOiJkZG5hLWRhbmllbC1hbGFyY29uLS1kaWdpdGFsLWNoaWVmLWV4cGVyaWVuY2UiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5hei5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9lNmY1ZTA3OS00ODI1LTQ2YjUtYjE5ZC05YjEwYzRjNDUzNjEifQ==';

let scene;

async function connect() {
  const videoEl = document.getElementById('sm-video');
  scene = new Scene({
    apiKey: apiKey,
    videoElement: videoEl,
    requestedMediaDevices: { microphone: true, camera: true },
    requiredMediaDevices: { microphone: true, camera: true },
  });

  await scene
    .connect()
    .then((sessionId) => onConnectionSuccess(sessionId))
    .catch((error) => onConnectionError(error));
}

function onConnectionSuccess(sessionId) {
  console.info('success! session id:', sessionId);
  scene
    .startVideo()
    .then((videoState) => console.info('started video with state:', videoState))
    .catch((error) => console.warn('could not start video:', error));
}

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

const connectButton = document.getElementById('connect-button');
connectButton.addEventListener('click', () => connect());

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', () => (window.location = '/'));

// Realizar la solicitud en modo 'no-cors'
fetch('https://dh.az.soulmachines.cloud/api/jwt', {
  method: 'GET',
  mode: 'no-cors',
})
  .then((response) => {
    if (response.ok) {
      console.log('Solicitud realizada con éxito.');
    } else {
      console.error('Error en la solicitud.');
    }
  })
  .catch((error) => {
    console.error('Error al hacer la solicitud:', error);
  });
