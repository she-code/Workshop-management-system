import React from 'react';

function Team({name,leader,members}) {
  return (
    <div>
      <h1>{name}</h1>
      {/* <p>{members}</p> */}
      {/* <p>{leader}</p> */}
      <div>
      <div>
        {Object.entries(leader).map(([key, value]) =>
            <p>{key} : {value}</p>
        )}
    </div>
    <pre>
    {JSON.stringify(leader, null, 2)}
  </pre>
          <div>
          {members.map(function(d, idx){
         return (
                    <div>
           <li key={idx}>{d.fname}</li>
          <li key={idx}>{d.lname}</li>
          <li key={idx}>{d.email}</li>
         </div>
         )
       })}
          </div>
      </div>
    </div>
  );
}


export default Team;
