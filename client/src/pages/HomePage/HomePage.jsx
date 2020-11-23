import React from "react";

import Header from "../../components/header/Header";
import CustomButton from "../../components/customButton/CustomButton";
import { withRouter } from "react-router-dom";
import Video from "../../img/backgroundVideo.mp4";

import { Row, Col } from "react-bootstrap";

import styles from "./homepage.module.scss";
const HomePage = ({ history }) => {
  return (
    <>
      <Header />
      <video
        id={styles.video}
        muted
        autoPlay
        style={{
          position: "absolute",
          top: 0,
          minHeight: "100vh",
          zIndex: "-1",
        }}
        loop
        src={Video}
        type="video/mp4"
      />
      <div className={styles.videoWrapper}>
        <div className={styles.title}>
          <Row>
            <Col
              xs={12}
              md={8}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h1>Refining the Uphill Game</h1>
              <p>
                As fit as a trail runner. As efficient as a climber. And as
                strong as a downhill skier. That’s the competency we built for
                with the Upstride and Stormstride Jackets and Pants—backcountry
                touring garments that can help anyone refine their uphill game.
              </p>
              <div className={styles.buttons}>
                <CustomButton
                  onClick={() => history.push("/products/male")}
                >
                  Shop Men's
                </CustomButton>
                <CustomButton
                  onClick={() => history.push("/products/female")}
                >
                  Shop Women's
                </CustomButton>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default withRouter(HomePage);
