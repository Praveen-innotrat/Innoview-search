import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { reviewContent } from "../Constant/ConstantValue";

function Review() {
  return (
    <>
      <section id="reviews">
        <div class="reviews-container">
          <div className="review-header">What People Are Saying</div>
          <div class="reviews-slider">
            {/* <!-- Individual review boxes --> */}
            {reviewContent.map((data, index) => {
              return (
                <>
                  <div key={index} class="review-box">
                    <div className="review-avatar">
                      <AccountCircleIcon
                        className="avatar-review"
                        style={{ fontSize: "48px" }}
                      />
                    </div>
                    <p className="review-content">{data.content}</p>
                    <div class="stars">{data.rating}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
