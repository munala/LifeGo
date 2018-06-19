import React from 'react';

import { storiesOf } from '@storybook/react';

import Form from '../App/Common/components/Form';

storiesOf('Form', module)
  .add('with some emoji', () => (
    <Form open onClose={() => {}} save={() => {}} />
  ));
