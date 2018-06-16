import React from 'react';

import { storiesOf } from '@storybook/react';

import IconLabelButton from '../App/Common/components/IconLabelButton';

storiesOf('IconLabelButton', module)
  .add('with some emoji', () => (
    <IconLabelButton label="home" name="home" onClick={() => {}} />
  ));
