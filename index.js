const apiKey =
  'eyJzb3VsSWQiOiJkZG5hLWRhbmllbC1hbGFyY29uLS1hY2NlbnR1cmUtYXZhdGFyIiwiYXV0aFNlcnZlciI6Imh0dHBzOi8vZGguYXouc291bG1hY2hpbmVzLmNsb3VkL2FwaS9qd3QiLCJhdXRoVG9rZW4iOiJhcGlrZXlfdjFfYjcwZGE2MGYtNTFlYy00N2U5LTk1MTctODllZjMxMDZlYmQxIn0=';

let scene;

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Este código se ejecuta en un navegador.
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
} else {
  // Este código se ejecuta en Node.js
  console.log('Este código se está ejecutando en Node.js');
  // Resto del código para Node.js
}
