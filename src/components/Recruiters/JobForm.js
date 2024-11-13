import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { fontSize } from "@mui/system";

function JobForm() {
  // Validation Schema with Yup
  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job title is required"),
    requiredExperienceMin: Yup.number()
      .required("Minimum experience is required")
      .min(0, "Experience must be greater than or equal to 0"),
    requiredExperienceMax: Yup.number()
      .required("Maximum experience is required")
      .min(0, "Experience must be greater than or equal to 0"),
    skillsRequired: Yup.string().required("Skills are required"),
    jobType: Yup.string().required("Job type is required"),
    jobStatus: Yup.string().required("Job status is required"),
    openings: Yup.number()
      .required("Number of openings is required")
      .min(1, "There must be at least one opening"),
    jobDescription: Yup.string().required("Job description is required"),
    additionalPreferences: Yup.string(),
    ctc: Yup.string().required("CTC is required"),
    perks: Yup.string(),
    availability: Yup.string().default("default"),
    alternateMobile: Yup.string().matches(
      /^[0-9]{10}$/,
      "Alternate mobile number must be 10 digits"
    ),
  });

  // Initial Values
  const initialValues = {
    jobTitle: "",
    requiredExperienceMin: "",
    requiredExperienceMax: "",
    skillsRequired: "",
    jobType: "",
    jobStatus: "",
    openings: "",
    jobDescription: "",
    additionalPreferences: "",
    ctc: "",
    perks: "",
    availability: "default",
    alternateMobile: "",
  };

  // Form Submission
  const handleSubmit = (values) => {
    console.log("Form data submitted:", values);
  };

  return (
    <div className="job-form-wrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="job-form">
            <div className="post-title-section">
              <div className="post-title">Job details</div>
            </div>
            <div className="jd-wrapper">
              {/* Job Title */}
              <div className="job-form-group">
                <label className="job-form-label">Job Title</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="jobTitle"
                  placeholder="Enter job title"
                />
                {errors.jobTitle && touched.jobTitle && (
                  <div className="form-error">{errors.jobTitle}</div>
                )}
              </div>

              {/* Required Experience */}
              <div className="job-form-group">
                <label className="job-form-label">
                  Required Experience (Min)
                </label>
                <Field
                  as="select"
                  className="job-form-input"
                  name="requiredExperienceMin"
                >
                  <option value="">Select minimum experience</option>
                  {[...Array(31).keys()].map((i) => (
                    <option key={i} value={i}>
                      {i} years
                    </option>
                  ))}
                </Field>
                {errors.requiredExperienceMin &&
                  touched.requiredExperienceMin && (
                    <div className="form-error">
                      {errors.requiredExperienceMin}
                    </div>
                  )}
              </div>
              <div className="job-form-group">
                <label className="job-form-label">
                  Required Experience (Max)
                </label>
                <Field
                  as="select"
                  className="job-form-input"
                  name="requiredExperienceMax"
                >
                  <option value="">Select maximum experience</option>
                  {[...Array(31).keys()].map((i) => (
                    <option key={i} value={i}>
                      {i} years
                    </option>
                  ))}
                </Field>
                {errors.requiredExperienceMax &&
                  touched.requiredExperienceMax && (
                    <div className="form-error">
                      {errors.requiredExperienceMax}
                    </div>
                  )}
              </div>

              {/* Skills Required */}
              <div className="job-form-group">
                <label className="job-form-label">Skills Required</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="skillsRequired"
                  placeholder="Enter required skills"
                />
                {errors.skillsRequired && touched.skillsRequired && (
                  <div className="form-error">{errors.skillsRequired}</div>
                )}
              </div>

              {/* Job Type */}
              <div className="job-form-group">
                <label className="job-form-label">Job Type</label>
                <Field as="select" className="job-form-input" name="jobType">
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                </Field>
                {errors.jobType && touched.jobType && (
                  <div className="form-error">{errors.jobType}</div>
                )}
              </div>

              {/* Job Status (Part-time/Full-time Radio Buttons) */}
              <div className="job-form-group">
                <label className="job-form-label">Job Status</label>
                <div>
                  <Field type="radio" name="jobStatus" value="full-time" />
                  Full-time
                  <Field type="radio" name="jobStatus" value="part-time" />
                  Part-time
                </div>
                {errors.jobStatus && touched.jobStatus && (
                  <div className="form-error">{errors.jobStatus}</div>
                )}
              </div>

              {/* Number of Openings */}
              <div className="job-form-group">
                <label className="job-form-label">Number of Openings</label>
                <Field
                  className="job-form-input"
                  type="number"
                  name="openings"
                  placeholder="Enter number of openings"
                />
                {errors.openings && touched.openings && (
                  <div className="form-error">{errors.openings}</div>
                )}
              </div>

              {/* Job Description */}
              <div className="job-form-group">
                <label className="job-form-label">Job Description</label>
                <Field
                  as="textarea"
                  className="job-form-input post-text-area"
                  name="jobDescription"
                  placeholder="Enter job description"
                />
                {errors.jobDescription && touched.jobDescription && (
                  <div className="form-error">{errors.jobDescription}</div>
                )}
              </div>

              {/* Additional Candidate Preferences */}
              <div className="job-form-group">
                <label className="job-form-label">
                  Additional Candidate Preferences
                </label>
                <Field
                  as="textarea"
                  className="job-form-input  post-text-area"
                  name="additionalPreferences"
                  placeholder="Enter additional preferences"
                />
                {errors.additionalPreferences &&
                  touched.additionalPreferences && (
                    <div className="form-error">
                      {errors.additionalPreferences}
                    </div>
                  )}
              </div>
            </div>
            {/* CTC */}

            <div className="jd-wrapper">
              <div className="job-form-group">
                <label className="job-form-label">CTC</label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="ctc"
                  placeholder="Enter CTC"
                />
                {errors.ctc && touched.ctc && (
                  <div className="form-error">{errors.ctc}</div>
                )}
              </div>

              {/* Perks (Optional) */}
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
              {/* Availability (Default value) */}
              <div className="job-form-group">
                <label className="job-form-label">Notice Period</label>
                <Field
                  as="select"
                  className="job-form-input"
                  name="availability"
                >
                  <option value="default">Default</option>
                  <option value="immediately">Immediately</option>
                  <option value="within-30-days">Within 30 days</option>
                </Field>
              </div>

              {/* Alternate Mobile Number */}
              <div className="job-form-group">
                <label className="job-form-label">
                  Alternate Mobile Number
                </label>
                <Field
                  className="job-form-input"
                  type="text"
                  name="alternateMobile"
                  placeholder="Enter alternate mobile number"
                />
                {errors.alternateMobile && touched.alternateMobile && (
                  <div className="form-error">{errors.alternateMobile}</div>
                )}
              </div>
            </div>
            {/* Submit Button */}
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

export default JobForm;
