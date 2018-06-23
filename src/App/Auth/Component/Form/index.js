import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../../../Common/components/TextInput';
import RaisedButton from '../../../Common/components/RaisedButton';
import FlatButton from '../../../Common/components/FlatButton';
import SocialButtons from './SocialButtons';
import '../../styles.css';

const Form = ({
  loginMode,
  action,
  user,
  onChange,
  socialLogin,
  touched,
  invalid,
  submitting,
  resetMode,
  resetEmail,
  onEmailChange,
  toggleReset,
}) => {
  const resetLabel = resetMode && 'reset password';

  const formUser = resetMode ? {
    'email you used to register': resetEmail,
  } : user;

  return (
    <div className="form-container ">
      {
      Object.keys(formUser).map(key => (
        <TextInput
          key={key}
          name={key}
          value={formUser[key]}
          onChange={resetMode ? onEmailChange : onChange}
          invalid={invalid}
          style={{ marginBottom: 10 }}
          disabled={touched && !formUser[key]}
        />
      ))
    }

      <div>
        <RaisedButton
          onClick={action}
          disabled={submitting}
          style={{ width: '100%' }}
          label={resetLabel || (loginMode ? 'login' : 'register')}
        />
        {
          loginMode &&
          <FlatButton
            onClick={toggleReset}
            disabled={submitting}
            style={{ width: '100%' }}
            label={!resetMode ? 'reset password' : 'cancel'}
          />
        }
      </div>

      {
        !resetMode &&
        <div>
          <p className="form-divider">- or -</p>
          <SocialButtons loginOrRegister={socialLogin} />
        </div>
      }
    </div>
  );
};

Form.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  resetEmail: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  resetMode: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  loginMode: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  socialLogin: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleReset: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
};

export default Form;
