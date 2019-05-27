import React from 'react';


function ShowCurrentActivity({current, user}) {
  return (
    <div>
      <h3>{`User #${user}`}</h3>
      What am I doing right now?<br/>

      <p>{current}</p>

<hr/>

    </div>
  );
}

export default ShowCurrentActivity;
