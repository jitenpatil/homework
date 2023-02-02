function ActiveStatus({status}){
    let color = "";
    status === 'Active' ? color = "green" : color = "red";  
  
    return (
        <>
          <div><span style={{height:'13px', width: '13px', backgroundColor:color, borderRadius: '50%', display: 'inline-block'}}></span>{' '+status}</div>
        </>
      );
}

export default ActiveStatus;