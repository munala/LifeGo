import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import RaisedButton from '../../../Common/components/RaisedButton';
import FlatButton from '../../../Common/components/FlatButton';
import SocialButtons from './SocialButtons';
import styles from '../../styles';
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
  toggleMode,
}) => {
  const resetLabel = resetMode && 'reset password';

  const formUser = resetMode ? {
    'email you used to register': resetEmail,
  } : user;

  return (
    <div className="login-form-container ">
      <form>
        {
          Object.keys(formUser).map(key => (
            <TextField
              key={key}
              name={key}
              label={key}
              value={formUser[key]}
              onChange={resetMode ? onEmailChange : onChange}
              style={styles.resetEmail}
              disabled={touched && !formUser[key]}
            />
          ))
        }
      </form>
      <div>
        <RaisedButton
          onClick={action}
          disabled={submitting}
          style={styles.fullWidth}
          label={resetLabel || (loginMode ? 'login' : 'register')}
        />
        <FlatButton
          onClick={toggleMode}
          disabled={submitting}
          style={styles.fullWidth}
          label={loginMode ? 'register' : 'login'}
        />
        {
          loginMode &&
          <FlatButton
            onClick={toggleReset}
            disabled={submitting}
            style={styles.fullWidth}
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
  toggleMode: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
};

export default Form;
