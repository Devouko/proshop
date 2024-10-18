import { Spinner } from "react-bootstrap";
import React from 'react'

function Loader() {
  return (
    <div>
      <Spinner>
        animation="border"
        role="status"
        style={{
            height: "100px",
            width: "100px",
            display:"block",
            margin: "auto"  //to center the spinner



        }

        }
      </Spinner>
    </div>
  )
}

export default Loader
