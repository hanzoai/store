import { DocPage } from '@/components/doc-page'

export default function GuidelinesPage() {
  return (
    <DocPage
      title="App Store Guidelines"
      lede={
        <>
          <p className="muted">
            <strong>Note:</strong> These guidelines apply to all submissions—apps, tools, agents, or other products—intended for distribution via the Hanzo App Store. By submitting your product, you agree to follow all guidelines outlined herein.
          </p>
          <p className="muted">
            Please read each section thoroughly before you submit.
          </p>
        </>
      }
    >
      <aside className="callout">
        <h2>Quick Checklist</h2>
        <ul>
          <li>Complete the App's name, description, keywords, and other information.</li>
          <li>Thoroughly test your app for crashes or major bugs on relevant devices or environments.</li>
          <li>Provide demo access or test credentials if your app requires any login or special configuration (only for Hanzo reviewers)</li>
          <li>If paid app, you must include a valid support link or email address, and ensure all contact details are up to date.</li>
          <li>Double-check that you have the rights to all third-party content (licenses, media, etc.).</li>
          <li>Confirm your app follows all Hanzo App Store guidelines and any local legal requirements.</li>
          <li>Prepare the icon and necessary screenshots or presentation screens (minimum one) following the 16:9 ratio.</li>
          <li>You must have a valid Hanzo Identity and it must match the App Metadata</li>
          <li>Create an account at store.hanzo.ai</li>
        </ul>
      </aside>

      <h2>1. Introduction</h2>
      <p>
        At Hanzo, our goal is to create a safe, trusted, and diverse ecosystem for developers and users alike. We believe high-quality submissions should:
      </p>
      <ul>
        <li>Provide value and enjoyment for end users.</li>
        <li>Respect user privacy, security, and safety.</li>
        <li>Comply with applicable laws, regulations, and ethical standards.</li>
        <li>Emphasize consistency, performance, and reliability.</li>
      </ul>
      <p>
        We encourage innovation, but also prioritize the well-being of our user community. Submissions that fail to follow these guidelines may be delayed, rejected, or removed from the Hanzo App Store at any time.
      </p>

      <h2>2. Before You Submit</h2>
      <h3>2.1 Testing and Stability</h3>
      <ul>
        <li><strong>Thorough Testing:</strong> Ensure your product is stable, free of major bugs, and tested on relevant devices or environments.</li>
        <li><strong>Demo Access:</strong> If your submission requires special credentials, test accounts, or hardware, you must provide a demo or test mode.</li>
        <li><strong>Metadata Accuracy:</strong> Confirm that your product's title, description, icons, and other materials accurately reflect its features and functionality.</li>
      </ul>

      <h3>2.2 Compliance Checklist</h3>
      <p>Before submitting, make sure you:</p>
      <ul>
        <li><strong>Provide Contact Details:</strong> If your app is paid, you must include a valid support email or URL for inquiries and assistance.</li>
        <li><strong>Prepare Documentation:</strong> Clearly document any technical or advanced configuration steps.</li>
        <li><strong>Obtain Necessary Licenses:</strong> If your product uses licensed content (e.g., media, libraries), confirm you have the right to distribute it.</li>
        <li><strong>Address Regional Requirements:</strong> If distributing your product in regions with specific legal requirements (e.g., gambling, financial services, health data), ensure full compliance with local laws and regulations.</li>
      </ul>

      <h2>3. Safety, Content, and Usage</h2>
      <h3>3.1 User Safety and Well-Being</h3>
      <ul>
        <li><strong>Harmful or Illegal Behavior:</strong> Products promoting violence, harassment, or illegal activities are strictly prohibited.</li>
        <li><strong>Physical Harm:</strong> Tools or functionalities that could endanger users (e.g., bypassing critical safety features of a device) will be rejected.</li>
        <li><strong>Medical Use:</strong> If your product falls under the "Medical" category or claims health-related benefits, it may undergo additional scrutiny. Ensure accuracy and disclose any limitations or disclaimers.</li>
      </ul>

      <h3>3.2 Inappropriate Content</h3>
      <p>Submissions must not include:</p>
      <ul>
        <li><strong>Hate Speech:</strong> Content that targets or advocates harm against individuals or groups.</li>
        <li><strong>Illegal or Restricted Goods:</strong> Any facilitation of transactions involving regulated or prohibited items.</li>
        <li><strong>Shocking or Graphically Violent Material:</strong> Excessive or disturbing depictions of violence, torture, or abuse.</li>
      </ul>

      <h3>3.3 User-Generated Content</h3>
      <p>If your product allows user-generated content, you must:</p>
      <ul>
        <li>Provide a way to report and filter objectionable or illegal content.</li>
        <li>Offer a method to block or ban abusive users.</li>
        <li>Respond promptly to user reports.</li>
      </ul>

      <h3>3.4 Originality</h3>
      <ul>
        <li>Apps must offer unique functionality or present existing functionality in a genuinely new or enhanced way.</li>
        <li>Apps that are merely copies or slight variations of existing apps without adding distinct value will be rejected.</li>
      </ul>

      <h2>4. Performance</h2>
      <h3>4.1 Completeness</h3>
      <ul>
        <li><strong>Full Functionality:</strong> Submissions should not be "beta," "demo," or placeholders. All primary features must be present, functional, and ready for review.</li>
        <li><strong>No Crashes or Errors:</strong> Apps, tools, or agents must not unexpectedly crash or produce persistent errors.</li>
      </ul>

      <h3>4.2 Resource Usage</h3>
      <ul>
        <li><strong>Efficiency:</strong> Your submission should not excessively consume CPU, battery, or network resources, aside from AI computation.</li>
        <li><strong>No Hidden Processes:</strong> Do not run unrelated background tasks.</li>
      </ul>

      <h3>4.3 Compatibility</h3>
      <ul>
        <li><strong>Target Platforms:</strong> Indicate clearly which platforms or environments your product supports and confirm testing has been done on those platforms.</li>
        <li><strong>Respect System Behavior:</strong> Submissions may not override or interfere with user settings or typical device behavior without explicit user consent.</li>
      </ul>
      <div className="coda">
        <p>
          By submitting a product to the Hanzo App Store, you affirm that you have read and will abide by these guidelines. You are also responsible for complying with any additional or evolving legal, regulatory, or policy requirements.
        </p>
        <p>
          Thank you for choosing the Hanzo App Store. We're excited to see what you'll create!
        </p>
      </div>
    </DocPage>
  )
}
