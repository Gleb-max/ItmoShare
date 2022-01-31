import React from 'react';

//redux
import {store} from 'redux/store';

//actions
import {welcomeComplete} from 'redux/actions';

//views
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {WelcomeView, AppFeaturesItem} from './Welcome.view';

//types
type WelcomeScreenProps = {};

import image1 from '@assets/images/appFeatures/1/image.png';
import image2 from '@assets/images/appFeatures/2/image.png';
import image3 from '@assets/images/appFeatures/3/image.png';
import image4 from '@assets/images/appFeatures/4/image.png';

//constants
const appFeaturesInfo: AppFeaturesItem[] = [
  {
    image: image1,
    content: 'Дели факультетское оборудование с другими',
  },
  {
    image: image2,
    content: 'Разрабатывай без лишних расходов',
  },
  {
    image: image3,
    content: 'Используй самые современные девайсы',
  },
  {
    image: image4,
    content: 'Тестируй свои проекты на новейших гаджетах',
  },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({}) => {
  return (
    <WelcomeView
      appFeaturesScreens={appFeaturesInfo}
      onWelcomeComplete={() => store.dispatch(welcomeComplete())}
    />
  );
};
