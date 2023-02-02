function ActiveStatus({status}){
    let color = "";
    status === 'Active' ? color = "green" : color = "red";  

    const styles={
      display: 'inline-block',
      borderRadius: '50%',
      backgroundColor:color,
      width: '13px',
      height:'13px'
    };

    return (
        <>
          <div><span style={styles}></span>{' '+status}</div>
        </>
      );
}

export default ActiveStatus;