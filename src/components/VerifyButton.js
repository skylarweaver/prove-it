import React from 'react';


const PrivateRoute = ({ handleVerifyClick, isVerified, loadingVerify, failedVerify }) => (
  <span>
    { isVerified ?
      <button type='button' onClick={handleVerifyClick} className='btn btn-small btn-primary ml-5'>Verified</button>
      :
      <span>
        {
          loadingVerify ?
            <button type='button' onClick={handleVerifyClick} className='btn btn-small btn-primary ml-5'>Loading Verify</button>
          :
          <span>
            {
              failedVerify ?
                  <button type='button' onClick={handleVerifyClick} className='btn btn-small btn-primary ml-5'>Verify Failed</button>
                  :
                  <button type='button' onClick={handleVerifyClick} className='btn btn-small btn-primary ml-5'>Verify</button>
            }
          </span>
        }
      </span>
     }
   </span>
);

export default PrivateRoute;

