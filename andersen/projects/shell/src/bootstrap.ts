import { bootstrapApplication, Title } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

  bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const title = appRef.injector.get(Title);
  title.setTitle('Shell App');
});
