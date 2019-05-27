import React from 'react';


function ShowSimilarUsers({users}) {
  return (
    <div>
      Who else is doing what I am doing?<br/>

      {users.map(obj => <p key={obj.user_id}>{obj.user_id}</p>)}
      <hr/>

    </div>
  );
}

export default ShowSimilarUsers;
