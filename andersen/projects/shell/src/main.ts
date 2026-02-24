import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'auth': 'http://localhost:8001/remoteEntry.json',
  'history': 'http://localhost:8002/remoteEntry.json',
  'todo': 'http://localhost:8003/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
