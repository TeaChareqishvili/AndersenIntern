import { bootstrapApplication, Title } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';



  bootstrapApplication(App, appConfig).then(appRef => {
  const title = appRef.injector.get(Title);
  title.setTitle('Auth App');
});
