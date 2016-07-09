import React, {PropTypes} from 'react';


const User = ({
  username,
  id,
  name,
  lastLogin,
}) => {
  let login;
  if (lastLogin) login = new Date(Number(lastLogin) * 1000).toString();

  return (
  <div id={id}>
    <p>{username}</p>
    <p>{id}</p>
    <p>{name}</p>
    <p>{login}</p>
  </div>
  );
};
User.propTypes = {
  username: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  lastLogin: PropTypes.number,
};
export default User;
