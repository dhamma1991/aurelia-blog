// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import {I18N} from 'aurelia-i18n';
import {ValidationMessageProvider} from 'aurelia-validation';
import {Backend, TCustomAttribute} from 'aurelia-i18n';

import 'bootstrap/dist/css/bootstrap.css';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    /* Register the aurelia-validation plugin */
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), instance => {
      let aliases = ['t', 'i18n'];

      TCustomAttribute.configureAliases(aliases);
      /* Configure the instance */
      instance.i18next.use(Backend.with(aurelia.loader));
      return instance.setup({
        /* Do the backend configuration 
          First, tell the plugin where the backend should load the configuration files from  */
        backend: {
          loadPath: 'locales/{{lng}}/{{ns}}.json'
        },
        lng: 'en',
        fallbackLng: 'fr',
        attributes: aliases,
        ns: ['translation'],
        debug: true
      });
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
