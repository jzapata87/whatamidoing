import React from 'react';


function ChooseActivity({join}) {
  return (
    <div className="ButtonList">
      Choose next activity?<br/>
      <button onClick={()=>join("washing")} >
        Wash
      </button>
      <button onClick={()=>join("dishes")} >
        Dishes
      </button>
      <button onClick={()=>join("studying")}>
        Study
      </button>
      <hr/>
    </div>
  );
}

export default ChooseActivity;
