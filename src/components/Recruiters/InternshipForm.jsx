import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { Button } from "@mui/material";

// Validation schema using Yup
const validationSchema = Yup.object({
  internshipProfile: Yup.string().required("Internship Profile is required"),
  skillsRequired: Yup.string().required("Skills Required is required"),
  internshipType: Yup.string().required("Internship Type is required"),
  partTime: Yup.string().required("Part-time/Full-time is required"),
  numberOfOpenings: Yup.number()
    .required("Number of Openings is required")
    .positive("Number of openings must be greater than zero"),
  internshipStartDate: Yup.date().required("Internship Start Date is required"),
  internshipDuration: Yup.string().required("Internship Duration is required"),
  internsResponsibilities: Yup.string().required(
    "Interns Responsibilities are required"
  ),
  additionalPreferences: Yup.string(),
  stipend: Yup.string().required("Stipend is required"),
  perks: Yup.string(),
  prePlacementOffer: Yup.string().required(
    "Please specify if PPO is available"
  ),
});

function InternshipForm() {
  return (
    <div className="internship-form-container">
      <Formik
        initialValues={{
          internshipProfile: "",
          skillsRequired: "",
          internshipType: "",
          partTime: "",
          numberOfOpenings: "",
          internshipStartDate: "",
          internshipDuration: "",
          internsResponsibilities: "",
          additionalPreferences: "",
          stipend: "",
          perks: "",
          prePlacementOffer: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data", values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="internship-form">
            <div className="jd-wrapper">
              <div className="job-form-group">
                <label className="job-form-label">Internship Profile</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="internshipProfile"
                  placeholder="Enter Internship Profile"
                />
                {errors.internshipProfile && touched.internshipProfile && (
                  <div className="error">{errors.internshipProfile}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Skills Required</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="skillsRequired"
                  placeholder="Enter Skills Required"
                />
                {errors.skillsRequired && touched.skillsRequired && (
                  <div className="error">{errors.skillsRequired}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Internship Type</label>
                <div className="job-form-radio-group">
                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="internshipType"
                      value="hybrid"
                    />
                    Hybrid
                  </label>
                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="internshipType"
                      value="remote"
                    />
                    Remote
                  </label>

                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="internshipType"
                      value="inOffice"
                    />
                    In-office
                  </label>
                </div>
                {errors.internshipType && touched.internshipType && (
                  <div className="error">{errors.internshipType}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Part-time / Full-time</label>
                <div className="job-form-radio-group">
                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="partTime"
                      value="partTime"
                    />
                    Part-time
                  </label>
                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="partTime"
                      value="fullTime"
                    />
                    Full-time
                  </label>
                </div>
                {errors.partTime && touched.partTime && (
                  <div className="error">{errors.partTime}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Number of Openings</label>
                <Field
                  className="job-form-input"
                  type="number"
                  name="numberOfOpenings"
                  placeholder="Enter Number of Openings"
                />
                {errors.numberOfOpenings && touched.numberOfOpenings && (
                  <div className="error">{errors.numberOfOpenings}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Internship Start Date</label>
                <Field
                  className="job-form-input-date"
                  type="date"
                  name="internshipStartDate"
                />
                {errors.internshipStartDate && touched.internshipStartDate && (
                  <div className="error">{errors.internshipStartDate}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Internship Duration</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="internshipDuration"
                  placeholder="Enter Internship Duration"
                />
                {errors.internshipDuration && touched.internshipDuration && (
                  <div className="error">{errors.internshipDuration}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">
                  Interns Responsibilities
                </label>
                <Field
                  className="job-form-input post-text-area"
                  as="textarea"
                  name="internsResponsibilities"
                  placeholder="Enter Interns Responsibilities"
                />
                {errors.internsResponsibilities &&
                  touched.internsResponsibilities && (
                    <div className="error">
                      {errors.internsResponsibilities}
                    </div>
                  )}
              </div>
              <div className="job-form-group">
                <label className="job-form-label">
                  Additional Candidate Preferences
                </label>
                <Field
                  className="job-form-input post-text-area"
                  as="textarea"
                  name="additionalPreferences"
                  placeholder="Enter Additional Preferences"
                />
              </div>
            </div>
            <div className="jd-wrapper">
              <div className="job-form-group">
                <label className="job-form-label">Stipend</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="stipend"
                  placeholder="Enter Stipend"
                />
                {errors.stipend && touched.stipend && (
                  <div className="error">{errors.stipend}</div>
                )}
              </div>

              <div className="job-form-group">
                <label className="job-form-label">Perks (Optional)</label>
                <div className="checkbox-group">
                  <label>
                    <Field type="checkbox" name="perks" value="Certificate" />
                    Certificate
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="perks"
                      value="Letter of recommendation"
                    />
                    Letter of recommendation
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="perks"
                      value="Flexible work hours"
                    />
                    Flexible work hours
                  </label>
                  <label>
                    <Field type="checkbox" name="perks" value="5 days a week" />
                    5 days a week
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="perks"
                      value="Informal dress code"
                    />
                    Informal dress code
                  </label>
                  <label>
                    <Field
                      type="checkbox"
                      name="perks"
                      value="Free snacks & beverages"
                    />
                    Free snacks & beverages
                  </label>
                </div>
              </div>
            </div>
            <div className="jd-wrapper">
              <div className="job-form-group">
                <label className="job-form-label">
                  Does this internship come with a Pre-placement Offer (PPO)?
                </label>
                <div className="job-form-radio-group">
                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="prePlacementOffer"
                      value="yes"
                    />
                    Yes
                  </label>
                  <label className="job-form-radio-label">
                    <Field
                      className="job-form-radio"
                      type="radio"
                      name="prePlacementOffer"
                      value="no"
                    />
                    No
                  </label>
                </div>
                {errors.prePlacementOffer && touched.prePlacementOffer && (
                  <div className="error">{errors.prePlacementOffer}</div>
                )}
              </div>
            </div>
            <div className="post-button-section">
              <Button
                sx={{ fontSize: 14 }}
                className="post-back-button"
                type="back"
                variant="contained"
              >
                Back
              </Button>
              <Button
                sx={{ fontSize: 14 }}
                className="post-submit-button"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default InternshipForm;
