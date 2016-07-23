import React, {PropTypes} from 'react';


const User = ({
  username,
  id,
  name,
  email,
  lastLogin,
}) => {
  let login;
  if (lastLogin) login = new Date(Number(lastLogin) * 1000).toString();

  return (
  <ul id={id}>
    <li>{`username: ${username}`}</li>
    <li>{`name: ${name}`}</li>
    <li>{`email: ${email}`}</li>
    <li>{`last login: ${login}`}</li>
  </ul>
  );
};
User.propTypes = {
  username: PropTypes.string.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
  lastLogin: PropTypes.number,
};
export default User;
