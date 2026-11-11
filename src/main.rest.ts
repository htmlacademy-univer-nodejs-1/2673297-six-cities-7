import 'reflect-metadata';
import { Container } from 'inversify';
import {Component} from './shared/types/component.enum.js';
import {RestApplication} from './rest/rest.application.js';
import {createOfferContainer} from './shared/types/offer/offer.container.js';
import {createRestApplicationContainer} from './rest/rest.container.js';
import {createUserContainer} from './shared/types/user/user.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
