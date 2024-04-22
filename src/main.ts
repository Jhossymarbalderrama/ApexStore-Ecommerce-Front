import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '@fortawesome/fontawesome-free/js/all.js';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
