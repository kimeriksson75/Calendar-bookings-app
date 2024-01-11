import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Loader = ({
    bookingData: {
        isFetching
    }
}) => {
    const [show, setShow] = useState(false);
    
    useEffect(() => {
        setShow(isFetching);
    }, [isFetching]);
    
    return (
        <div data-testid="loader" className="loader-container">
            <div className={`loader-spinner-wrapper loader-spinner-wrapper${show ? '--show' : ''}`}>
                <div className="loader-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return ({
      bookingData: state.bookingData
    })
  }

export default connect(mapStateToProps, {})(Loader);