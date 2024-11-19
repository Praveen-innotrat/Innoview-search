import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Navbar from "../layout-components/Navbar";
import Footer from "../layout-components/StickyFooter";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const PageSection = styled("div")({
  textAlign: "center",
  padding: "2rem", // Add padding for content
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add shadow for separation
});

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem", // Adjust the font size
  fontWeight: "bold",
  color:"blue",
  marginBottom: theme.spacing(3),
}));

const Content = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  lineHeight: "1.6",
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",
  lineHeight: "1.6",
  marginBottom: theme.spacing(2),
  textAlign: "justify",
  padding: "0rem 2rem", // Adjust paragraph padding
  fontFamily: "'Roboto Slab', serif",
  fontWeight: "400",
  letterSpacing: "0.07rem",
  color: "deepgrey",
}));

const TermsAndConditions = () => {
  return (
    <PageContainer>
      <Navbar />
      <PageSection>
      <Title variant="h1">Terms and Conditions</Title>
        <Content variant="body1">
          <Paragraph>
            <strong style={{ color: "violet", fontWeight:"bold" }}>
              These Terms & Conditions (“Terms”) of (a) use of our website
              www.innotrat.com (“Website”), or any products or services in
              connection with the Website/products (“Services”)  or (b) any
              modes of registrations or usage of products, including through SD
              cards, tablets or other storage/transmitting device  are between
              Innotrat Labs Private Limited (“Company/We/Us/Our”) and its users
              (“User/You/Your”).{" "}
            </strong>
            <br />
            <br />
            These Terms constitute an electronic record in accordance with the
            provisions of the Information Technology Act, 2000 and the
            Information Technology (Intermediaries guidelines) Rules, 2011
            thereunder, as amended from time to time. Please read the Terms and
            the privacy policy of the Company (“Privacy Policy”) with respect to
            registration with us, the use of the Application, Website, Services,
            and products carefully before using the Website, Services or
            products. In the event of any discrepancy between the Terms and any
            other policies with respect to the Website or Services or products,
            the provisions of the Terms shall prevail. Your use/access/browsing
            of the Website or the Services or products or registration (with or
            without payment/with or without subscription) through any means
            shall signify Your acceptance of the Terms and Your agreement to be
            legally bound by the same. If you do not agree with the Terms or the
            Privacy Policy, please do not use the or Website or avail the
            Services or products. Any access to our Services/products through
            registrations/subscription is nontransferable.
            <br />
            <br />
            <strong>1.</strong> &nbsp; Except as mentioned below, all
            information, content, material, trademarks, services marks, trade
            names, and trade secrets including but not limited to the software,
            text, images, graphics, video, script and audio, contained in the
            Website, Services and products are proprietary property of the
            Company (“Proprietary Information”). No Proprietary Information may
            be copied, downloaded, reproduced, modified, republished, uploaded,
            posted, transmitted or distributed in any way without obtaining
            prior written permission from the Company and nothing on this
            Website or Services shall be or products deemed to confer a license
            of or any other right, interest or title to or in any of the
            intellectual property rights belonging to the Company, to the User.
            You may own the medium on which the information, content or
            materials resides, but the Company shall at all times retain full
            and complete title to the information, content or materials and all
            intellectual property rights inserted by the Company on such medium.
            Certain contents on the Website may belong to third parties. Such
            contents have been reproduced after taking prior consent from said
            party and all rights relating to such content will remain with such
            third party. Further, you recognize and acknowledge that the
            ownership of all trademarks, copyright, logos, service marks and
            other intellectual property owned by any third party shall continue
            to vest with such party and You are not permitted to use the same
            without the consent of the respective third party.
            <br />
            <br />
            <strong>2.</strong> Your use of our products, Website and Services
            is solely for Your personal and non-commercial use. Any use of the
            Website, Services or products or their contents other than for
            personal purposes is prohibited. Your personal and non-commercial
            use of this Website, products and / or our Services shall be
            subjected to the following restrictions:
            <br />
            <br />
            <span style={{ display: "inline-block", paddingLeft: "1.5rem" }}>
              <span style={{ color: "blue" }}>i.</span> &nbsp;You may not
              decompile, reverse engineer, or disassemble the contents of our
              Website and/or Services/ products or modify, copy, distribute,
              transmit, display, perform, reproduce, publish, license, create
              derivative works from, transfer, or sell any information or
              software obtained from our Website and/or Services/products, or
              remove any copyright, trademark registration, or other proprietary
              notices from the contents of our Website and/or Services/products.
              <br />
              <br />
              <span style={{ color: "blue" }}>ii.</span> &nbsp;You will not (a)
              use our website and/or any of our product/s or Service/s for
              commercial purposes of any kind, or (b) advertise or sell any
              products, Services or domain names or otherwise (whether or not
              for profit), or solicit others (including, without limitation,
              solicitations for contributions or donations) or use any public
              forum for commercial purposes of any kind.
              <br />
              <br />
              <span style={{ color: "blue" }}>iii.</span> &nbsp; Website/our
              products and Services in any way that is unlawful or harms the
              Company or any other person or entity as determined by the
              Company.
              <br />
              <br />
              <span style={{ color: "blue" }}>iv.</span> &nbsp;No User shall be
              permitted to perform any of the following prohibited activities
              while availing our Services:
            </span>
            <br />
            <br />
            <br />
            <span style={{ display: "inline-block", paddingLeft: "3.4rem" }}>
              &nbsp;<span style={{ color: "blue" }}>a.</span> &nbsp;Making
              available any content that is misleading, unlawful, harmful,
              threatening, abusive, tortious, defamatory, libelous, vulgar,
              obscene, child-pornographic, lewd, lascivious, profane, invasive
              of another's privacy, hateful, or racially, ethnically, or
              otherwise objectionable.
              <br />
              &nbsp;<span style={{ color: "blue" }}>b.</span> &nbsp;Stalking,
              intimidating and/or harassing another and/or inciting other to
              commit violence.
              <br />
              &nbsp;<span style={{ color: "blue" }}>c.</span> &nbsp;Transmitting
              material that encourages anyone to commit a criminal offence, that
              results in civil liability or otherwise breaches any relevant
              laws, regulations, or code of practice.
              <br />
              &nbsp;<span style={{ color: "blue" }}>d.</span> &nbsp;Interfering
              with any other person's use or enjoyment of the Website/Services;
              <br />
              &nbsp;<span style={{ color: "blue" }}>e.</span> &nbsp;Making,
              transmitting or storing electronic copies of materials protected
              by copyright without the permission of the owner, committing any
              act that amounts to the infringement of intellectual property or
              making available any material that infringes any intellectual
              property rights or other proprietary rights of anyone else.
              <br />
              &nbsp;<span style={{ color: "blue" }}>f.</span> &nbsp;Make
              available any content or material that You do not have a right to
              make available under any law or contractual or fiduciary
              relationship unless You own or control the rights thereto or have
              received all necessary consents for such use of the content.
              <br />
              &nbsp;<span style={{ color: "blue" }}>g.</span> &nbsp;Impersonate
              any person or entity, or falsely state or otherwise misrepresent
              Your affiliation with a person or entity.
              <br />
              &nbsp;<span style={{ color: "blue" }}>h.</span> &nbsp;Post,
              transmit or make available any material that contains viruses,
              trojan horses, worms, spyware, time bombs, cancelbots, or other
              computer programming routines, code, files or such other programs
              that may harm the services, interests or rights of other users or
              limit the functionality of any computer software, hardware or
              telecommunications, or that may harvest or collect any data or
              personal information about other Users without their consent.
              <br />
              &nbsp;<span style={{ color: "blue" }}>i.</span> &nbsp;Access or
              use the Website/Services/products in any manner that could damage,
              disable, overburden, or impair any of the Website's servers or the
              networks connected to any of the servers on which the Website is
              hosted.
              <br />
              &nbsp;<span style={{ color: "blue" }}>j.</span>{" "}
              &nbsp;Intentionally or unintentionally interfere with or disrupt
              the services or violate any applicable laws related to the access
              to or use of the Website/Services/products, violate any
              requirements, procedures, policies or regulations of networks
              connected to the Website/Services/products, or engage in any
              activity prohibited by these Terms.
              <br />
              &nbsp;<span style={{ color: "blue" }}>k.</span> &nbsp;Disrupt or
              interfere with the security of, or otherwise cause harm to, the
              Website/Services/products, materials, systems resources, or gain
              unauthorized access to user accounts, passwords, servers or
              networks connected to or accessible through the
              Website/Services/products or any affiliated or linked sites.
              <br />
              &nbsp;<span style={{ color: "blue" }}>l.</span> &nbsp;Interfere
              with or inhibit any user from using and enjoying access to the
              Website/ Services/products, or other affiliated sites, or engage
              in disruptive attacks such as denial of service attack on the
              Website/Services/products.
              <br />
              &nbsp;<span style={{ color: "blue" }}>m.</span> &nbsp;Use
              deep-links, page-scrape, robot, spider or other automatic device,
              program, algorithm or methodology, or any similar or equivalent
              manual process, to increase traffic to the
              Website/Services/products, to access, acquire, copy or monitor any
              portion of the Website/Services/products, or in any way reproduce
              or circumvent the navigational structure or presentation of any
              content, to obtain or attempt to obtain any content, documents or
              information through any means not specifically made available
              through the Website/Services/products;
              <br />
              &nbsp;<span style={{ color: "blue" }}>n.</span> &nbsp;Alter or
              modify any part of the Services.
              <br />
              &nbsp;<span style={{ color: "blue" }}>o.</span> &nbsp;Use the
              Services for purposes that are not permitted by: (i) these Terms;
              and (ii) any applicable law, regulation or generally accepted
              practices or guidelines in the relevant jurisdiction; or p.Violate
              any of the terms specified under the Terms for the use of the
              Application /Website/Services/products.
            </span>
            <br />
            <br />
            <strong>3.</strong> &nbsp;By submitting content on or through the
            Services (your “Material”), you grant us a worldwide, non-exclusive,
            royalty-free license (with the right to sublicense) to use, copy,
            reproduce, process, adapt, modify, publish, transmit, display and
            distribute such Material in any and all media or distribution
            methods (now known or later developed) and to associate your
            Material with you, except as described below. You agree that others
            may use Your Material in the same way as any other content available
            through the Services. Other users of the Services may fork, tweak
            and repurpose your Material in accordance with these Terms. If you
            delete your user account, your Material and name may remain
            available through the Services
            <br />
            <br />
            <strong>4.</strong> &nbsp;In the preparation of the
            Website/Services/products and contents therein, every effort has
            been made to offer the most current, correct, and clearly expressed
            information possible. Nevertheless, inadvertent errors may occur.
            Any feedback from User is most welcome to make the contents thereof
            error free and user friendly. Company also reserves the right and
            discretion to make any changes/corrections or withdraw/add contents
            at any time without notice. Neither the Company nor any third
            parties provide any warranty or guarantee as to the accuracy,
            timeliness, performance, completeness or suitability of the
            information and materials found or offered on
            Website/Services/products for any particular purpose. You
            acknowledge that such information and materials may contain
            inaccuracies or errors and we expressly exclude liability for any
            such inaccuracies or errors to the fullest extent permitted by law.
            <br />
            <br />
            <strong>5.</strong> &nbsp;Our Website provides Users with access to
            compiled educational information and related sources. Such
            information is provided on an As Is basis and We assume no liability
            for the accuracy or completeness or use or non obsolescence of such
            information. We shall not be liable to update or ensure continuity
            of such information contained on the Website. We would not be
            responsible for any errors, which might appear in such information,
            which is compiled from third party sources or for any unavailability
            of such information. From time to time the Website may also include
            links to other websites. These links are provided for your
            convenience to provide further information. They do not signify that
            we endorse the website(s). We have no responsibility for the content
            of the linked website(s). You may not create a link to the Website
            from another website or document without the Company's prior written
            consent.
            <br />
            <br />
            <strong>6.</strong> &nbsp;The contents of the Services/products are
            developed on the concepts covered in the structured curriculum
            syllabus prescribed for students of various courses. The usage of
            the Services/products is not endorsed as a substitution to the
            curriculum-based education provided by the educational institutions
            but is intended to supplement the same by explaining and presenting
            the concepts in a manner enabling easy understanding. The basic
            definitions and formulae of the subject matter would remain the
            same. The Company acknowledges that there are various means of
            delivering structured curriculum pedagogy and inclusion of methods
            in the Services/products does not imply endorsement of any method
            nor exclusion imply disapproval. Subscription to the usage of our
            Services/Website/products does not in any manner guarantee admission
            to any educational institutions or passing of any exams or
            achievement of any specified percentage of marks in any
            examinations.
            <br />
            <br />
            <strong>7.</strong> &nbsp;Certain contents in the
            Services/Website/products (in particular relating to assistance in
            preparations for administrative services) may contain opinions and
            views. The Company shall not be responsible for such opinions or any
            claims resulting from them. Further, the Company makes no warranties
            or representations whatsoever regarding the quality, content,
            completeness, or adequacy of such information and data.
            <br />
            <br />
            <strong>8.</strong> &nbsp;Some parts of the Services are
            interactive, and we encourage contributions by Users, which may or
            may not be subject to editorial control prior to being posted. The
            Company accepts no responsibility or liability for any material
            communicated by third parties in this way. The Company reserves the
            right at its sole discretion to remove, review, edit or delete any
            content. Similarly, We will not be responsible or liable for any
            content uploaded by Users directly on the Website, irrespective of
            whether We have certified any answer uploaded by the User. We would
            not be responsible to verify whether such questions/answers or
            contents placed by any User contain infringing materials or not.
            <br />
            <br />
            <strong>9.</strong> &nbsp;The Company (including but not limited to
            its subsidiaries/affiliates) may, based on any form of access to the
            Services or Website or registrations through any source whatsoever,
            contact the User through sms, email and call, to give information
            about their offerings and products as well as notifications on
            various important updates and/or to seek permission for
            demonstration of its products. The User expressly grants such
            permission to contact him/her through telephone, SMS, e-mail and
            holds the Company (including but not limited to its
            subsidiaries/affiliates) indemnified against any liabilities
            including financial penalties, damages, expenses in case the User's
            mobile number is registered with Do not Call (DNC) database. By
            registering yourself, you agree to make your contact details
            available to Our employees, associates, subsidiaries, affiliates and
            partners so that you may be contacted for education information,
            offerings and promotions through telephone, SMS, email etc.
            <br />
            <br />
            <strong>10.</strong> &nbsp;While the Company may, based on the
            User's confirmation, facilitate the demonstration of its products at
            the location sought by the User, the User acknowledges that he/she
            has not been induced by any statements or representations of any
            person with respect to the quality or conditions of the products and
            that User has relied solely on the investigations, examinations and
            inspections as the User has chosen to make and that the Company has
            afforded the User the opportunity for full and complete
            investigations, examinations and inspections.
            <br />
            <br />
            <strong>11.</strong> &nbsp;Upon registration through any means
            whatsoever, the Company may contact You through the registered
            mobile number or e-mail or any other mobile number or contact number
            or email provided by You to enable effective provision of Services.
            The User expressly permits the Company to contact him/her and the
            student utilising the Services, through the above mentioned means at
            any time post registration. .-. Further, the Company shall have the
            right to monitor the download and usage of the Services/products and
            the contents thereof by the User/student, to analyze such usage and
            discuss the same with the User/student to enable effective and
            efficient usage of the Services. The User expressly permits the
            Company to clear the doubts of the student using the Services/online
            portal by answering the questions placed before it, providing study
            plans, informing of the progress, providing feedback, communicating
            with the student and mentoring the student through telephone or
            e-mail on express consent of the legal guardian/parent of the User
            or through any other forum.
            <br />
            <br />
            <strong>12.</strong> &nbsp;While the Company has made efforts to
            train the personnel engaged in the sales and services relating to
            its products to enable quality control, it makes no warranties or
            representations whatsoever regarding the quality and competence of
            such personnel and would not be responsible for any deviant
            behaviour of any such personnel. Any feedback from User relating to
            the same is most welcome and Company reserves the right and
            discretion to take any action in this regard.
            <br />
            <br />
            <strong>13.</strong> &nbsp;Access to certain elements of the
            Services including doubt clearance, mentoring services etc may be
            subject to separate terms, conditions and fair usage policy. The
            Company reserves the right to determine the criteria for provision
            of various elements of Services to the different categories of Users
            based on its policies. Hence, subscription to the products or
            registrations do not automatically entitle the User to any and all
            elements of Services provided by the Company and the Company shall
            be entitled to exercise its discretion while providing access to and
            determining continuity of certain elements of Services. We reserve
            the right to extend, cancel, discontinue, prematurely withdraw or
            modify any of Our Services at Our discretion.
            <br />
            <br />
            <strong>14.</strong> &nbsp;The Company's products and / or Services,
            including the content, are compatible only with certain
            devices/tablets/instruments/hardware. The Company shall not be
            obligated to provide workable products and / or services for any
            instruments that are not recognized by the Company or those
            instruments that may be purchased from any third party which are not
            compatible with the Company's products and Services. The company
            reserves the right to upgrade the table/ type of compatible devices
            as required from time to time.
            <br />
            <br />
            <strong>15.</strong> &nbsp;The Company shall have no responsibility
            for any loss or damage caused to tablet or any other hardware and /
            or software and/or instrument, including loss of data or effect on
            the processing speed, resulting from Your use of our products and
            Services.
            <br />
            <br />
            <strong>16.</strong> &nbsp;In order to encourage Customer Retention
            and Loyalty, Innotrat Labs Pvt. Ltd. encourages its Customers,
            Fintech Partners and other stakeholders to refer customers to buy
            Innotrat Labs Products & Services. Company at its option can pay
            referral bonus subject to applicable laws. Since this is an optional
            selective policy of the Company, the decision of the Company is
            final and the same cannot be either disputed or challenged. It
            should be noted with abundant caution that no Customer, Fintech
            Partner or other stake holder shall do business with the Company in
            anticipation of such Bonus. Company shall not be held responsible if
            some Customer has done business with the objective of getting
            referral bonus as Bonus paid by the Company is purely dependent on
            its own discretion based on internal parameters and various
            demographic and economic factors.
            <br />
            <br />
            <strong>17.</strong> &nbsp;You have to specify the address to which
            the shipment has to be made at the time of purchase. All product(s)
            shall be delivered directly to the address as specified at the point
            of ordering and You cannot, under any circumstances whatsoever,
            change the address after the order is processed. In case of any
            change in the address, You need to specify the same to us in writing
            well in advance to the shipping date. Any inconsistencies in name or
            address will result in non-delivery of the product(s).
            <br />
            <br />
            <strong>18.</strong> &nbsp;You acknowledge that the Company is not
            the manufacturer of the instrument/medium/hardware and hence, any
            defect relating to the same shall be reported to the manufacturer
            whose details shall be specified on the packaging and the Company
            shall not be in any manner responsible for the same. The Company
            does not provide any guarantee or warranty relating to the
            instrument/medium/hardware.
            <br />
            <br />
            <strong>19.</strong> &nbsp;In order to access the Services and to
            avail the use of the products, You shall be required to register
            yourself with the Services/products, and maintain an account with
            the Services/products. You will be required to furnish certain
            information and details, including Your name, mobile number, e-mail
            address, payment information (credit/debit card details) if
            required, and any other information deemed necessary by our website.
            With respect to the provision of information, the following may be
            noted:-
            <br />
            <br />
            <span style={{ display: "inline-block", paddingLeft: "3rem" }}>
              <strong>&#9635;</strong> It is Your sole responsibility to ensure
              that the account information provided by You is accurate, complete
              and latest.
              <br />
              <br />
              <strong>&#9635;</strong> You shall be responsible for maintaining
              the confidentiality of the account information and for all
              activities that occur under Your account. You agree to (a) ensure
              that You successfully log out from Your account at the end of each
              session; and (b) immediately notify the Company of any
              unauthorized use of Your account. If there is reason to believe
              that there is likely to be a breach of security or misuse of Your
              account, we may request You to change the password or we may
              suspend Your account without any liability to the Company, for
              such period of time as we deem appropriate in the circumstances.
              We shall not be liable for any loss or damage arising from Your
              failure to comply with this provision.
              <br />
              <br />
              <strong>&#9635;</strong> You acknowledge that Your ability to use
              Your account is dependent upon external factors such as internet
              service providers and internet network availability and the
              Company cannot guarantee accessibility to the website at all
              times. In addition to the disclaimers set forth in the Terms, the
              Company shall not be liable to You for any damages arising from
              Your inability to log into Your account and access the services of
              the Application at any time.
            </span>
            <br />
            <br />
            <br />
            <strong>20.</strong> &nbsp;Persons who are "competent/capable" of
            contracting within the meaning of the Indian Contract Act, 1872
            shall be eligible to register for all Our products or Services.
            Persons who are minors, un-discharged insolvents etc. are not
            eligible to register for Our products or Services. As a minor if You
            wish to use Our products or Services, such use shall be made
            available to You by Your legal guardian or parents, who has agreed
            to these Terms. In the event a minor utilizes the Website/Services,
            it is assumed that he/she has obtained the consent of the legal
            guardian or parents and such use is made available by the legal
            guardian or parents. The Company will not be responsible for any
            consequence that arises as a result of misuse of any kind of Our
            products or Services that may occur by virtue of any person
            including a minor registering for the Services/products provided. By
            using the products or Services You warrant that all the data
            provided by You is accurate and complete and that student using the
            website has obtained the consent of parent/legal guardian (in case
            of minors). The Company reserves the right to terminate Your
            subscription and / or refuse to provide You with access to the
            products or Services if it is discovered that You are under the age
            of 18 (eighteen) years and the consent to use the products or
            Services is not made by Your parent/legal guardian or any
            information provided by You is inaccurate. You acknowledge that the
            Company does not have the responsibility to ensure that You conform
            to the aforesaid eligibility criteria. It shall be Your sole
            responsibility to ensure that You meet the required qualification.
            Any persons under the age of 18 (eighteen) should seek the consent
            of their parents/legal guardians before providing any Information
            about themselves or their parents and other family members on the
            website.
            <br />
            <br />
            <strong>21.</strong> &nbsp;You agree to defend, indemnify and hold
            harmless the Company, its officers, directors, employees and agents,
            from and against any and all claims, damages, obligations, losses,
            liabilities, costs or debt, and expenses (including but not limited
            to attorney's fees) arising from: (i) Your use of and access of the
            Website/Services; (ii) Your violation of any term of these Terms or
            any other policy of the Company; (iii) Your violation of any third
            party right, including without limitation, any copyright, property,
            or privacy right; or (iv) any claim that Your use of the
            Website/Services has caused damage to a third party. This defence
            and indemnification obligation will survive these Terms.
            <br />
            <br />
            <strong>22.</strong> &nbsp;In no event shall the Company, its
            officers, directors, employees, partners, or agents be liable to You
            or any third party for any special, incidental, indirect,
            consequential or punitive damages whatsoever, including those
            resulting from loss of use, data or profits or any other claim
            arising out, of or in connection with, Your use of, or access to,
            the website.
            <br />
            <br />
            <strong>23.</strong> &nbsp;In the event of Your breach of these
            Terms, You agree that the Company will be irreparably harmed and may
            not have an adequate remedy in money or damages. The Company
            therefore, shall be entitled in such event to obtain an injunction
            against such a breach from any court of competent jurisdiction. The
            Company's right to obtain such relief shall not limit its right to
            obtain other remedies.
            <br />
            <br />
            <strong>24.</strong> &nbsp;Any violation by You of the terms of this
            Clause may result in immediate suspension or termination of Your
            Accounts apart from any legal remedy that the Company can avail. In
            such instances, the Company may also disclose Your Account
            Information if required by any Governmental or legal authority. You
            understand that the violation of these Terms could also result in
            civil or criminal liability .
            <br />
            <br />
            <strong>25.</strong> &nbsp;The Terms shall be governed by and
            construed in accordance with the laws of India, without regard to
            conflict of law principles. Further, the Terms shall be subject to
            the exclusive jurisdiction of the competent courts located in
            Bangalore and You hereby accede to and accept the jurisdiction of
            such courts.
            <br />
            <br />
            <strong>26.</strong> &nbsp;The Company has the right to change
            modify, suspend, or discontinue and/or eliminate any aspect(s),
            features or functionality of the Services as it deems fit at any
            time without notice. Further, the Company has the right to amend
            these Terms from time to time without prior notice to you. The
            Company makes no commitment, express or implied, to maintain or
            continue any aspect of the website. You agree that the Company shall
            not be liable to You or any third party for any modification,
            suspension or discontinuance of the Services. All prices are subject
            to change without notice.
          </Paragraph>
        </Content>
      </PageSection>
      <Footer />
    </PageContainer>
  );
};

export default TermsAndConditions;
