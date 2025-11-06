'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { HanzoLogo } from '@hanzo/logo/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent, CardHeader } from '@hanzo/ui'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <HanzoLogo size={36} className="text-foreground" />
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Store
              </Link>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              <strong>Last Updated:</strong> February 2025
            </p>
            <p className="text-foreground/90 mt-4">
              Welcome to <strong>Hanzo Store</strong>. These Terms of Service ("Terms") govern your access to and use of the Hanzo Store platform, website, applications, and related services (collectively, the "Service" or "Hanzo Store"). By accessing or using the Hanzo Store, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
            </p>
          </div>

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/90 mb-4">
                By creating an account, browsing, downloading, or otherwise using the Hanzo Store, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, as well as our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/guidelines" className="text-primary hover:underline">App Store Guidelines</Link>.
              </p>
              <p className="text-foreground/90 mb-4">
                These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Hanzo Industries Inc. ("Hanzo," "we," "us," or "our"). If you are using the Hanzo Store on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and references to "you" or "your" also include that organization.
              </p>
              <p className="text-foreground/90 mb-4">
                We reserve the right to update or modify these Terms at any time. If we make material changes, we will provide notice (for example, by updating the "Last Updated" date, or by sending an email notification if required). Your continued use of the Hanzo Store after changes take effect constitutes your acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Eligibility and Account Registration</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">2.1 Minimum Age</h3>
                  <p className="text-foreground/90">
                    You must be at least 13 years of age (or the equivalent minimum age in your jurisdiction) to use the Hanzo Store. If you are under 18 (or your jurisdiction's age of majority), you must have permission from a parent or guardian to use this Service. By using the Hanzo Store, you represent that you meet these age requirements.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2.2 Account Creation</h3>
                  <p className="text-foreground/90 mb-2">
                    In order to download apps, make purchases, or access certain features, you must create an account. When creating an account, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Provide Accurate Information:</strong> Supply truthful, current, and complete information (e.g., name, email address). You must promptly update your account if any information changes.</li>
                    <li><strong>Maintain Account Security:</strong> Keep your login credentials (username and password) confidential. You are responsible for all activity that occurs under your account. If you suspect unauthorized use, you must notify us immediately at support@shinkai.com.</li>
                    <li><strong>One Account Per User:</strong> You may not create multiple accounts to abuse the service or circumvent restrictions.</li>
                    <li><strong>No Account Sharing:</strong> Your account is personal to you and may not be shared or transferred to another individual or entity without our prior written consent.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2.3 Account Suspension or Termination</h3>
                  <p className="text-foreground/90">
                    We reserve the right to suspend or terminate your account (with or without notice) if we determine that you have violated these Terms, engaged in fraudulent or illegal activity, or otherwise misused the Service. Upon termination, your right to use the Hanzo Store will immediately cease, and you may lose access to content or services associated with your account.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Use of the Service</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">3.1 License to Use</h3>
                  <p className="text-foreground/90">
                    Subject to your compliance with these Terms, Hanzo grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Hanzo Store for personal, non-commercial purposes. This license does not include any rights to: (a) resell or make commercial use of the Service; (b) modify, adapt, or create derivative works of the Hanzo Store; (c) use automated means (such as bots or scrapers) to access the Service; or (d) interfere with or disrupt the Service or servers or networks connected to it.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3.2 Prohibited Conduct</h3>
                  <p className="text-foreground/90 mb-2">
                    You agree not to engage in any of the following prohibited activities:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Illegal Activities:</strong> Using the Service for any unlawful purpose or in violation of any local, state, national, or international law.</li>
                    <li><strong>Harmful Content:</strong> Uploading, posting, or transmitting malware, viruses, or any code designed to harm the Service or other users.</li>
                    <li><strong>Harassment or Abuse:</strong> Harassing, threatening, or harming other users or Hanzo personnel.</li>
                    <li><strong>Intellectual Property Infringement:</strong> Infringing on the copyrights, trademarks, patents, or other intellectual property rights of Hanzo or third parties.</li>
                    <li><strong>Misrepresentation:</strong> Impersonating any person or entity, or falsely stating or misrepresenting your affiliation with any person or entity.</li>
                    <li><strong>Unauthorized Access:</strong> Attempting to gain unauthorized access to any part of the Service, other users' accounts, or our systems or networks.</li>
                    <li><strong>Interference:</strong> Interfering with or disrupting the Service, servers, or networks, or disobeying any requirements, procedures, policies, or regulations of networks connected to the Service.</li>
                  </ul>
                  <p className="text-foreground/90 mt-2">
                    Violation of this section may result in immediate suspension or termination of your account and may subject you to civil or criminal liability.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3.3 User Content</h3>
                  <p className="text-foreground/90">
                    The Hanzo Store may allow you to post, submit, or share content (such as reviews, ratings, or comments). You retain ownership of any intellectual property rights you hold in that content. However, by submitting content to the Service, you grant Hanzo a worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, display, and perform that content in connection with operating and improving the Service. You represent and warrant that you have all necessary rights to grant this license and that your content does not infringe on the rights of any third party. Hanzo reserves the right (but is not obligated) to remove or refuse to display any user content that violates these Terms or is otherwise objectionable.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Applications and Content</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">4.1 Third-Party Apps</h3>
                  <p className="text-foreground/90">
                    The Hanzo Store hosts applications, tools, agents, and other software developed by third-party developers ("Third-Party Apps"). Hanzo does not develop or control Third-Party Apps and is not responsible for their functionality, content, or quality. Each Third-Party App is subject to its own terms and conditions and privacy policy, which you should review before installing or using the app. Your use of any Third-Party App is at your sole risk. Any issues with a Third-Party App should be directed to the app's developer, not Hanzo.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">4.2 Developer Responsibilities</h3>
                  <p className="text-foreground/90">
                    Third-Party App developers are solely responsible for ensuring their apps comply with all applicable laws, regulations, and our <Link href="/guidelines" className="text-primary hover:underline">App Store Guidelines</Link>. While Hanzo reviews submissions and may remove apps that violate our policies, we do not guarantee that every Third-Party App will be error-free, secure, or appropriate for all users. Developers are responsible for providing support, updates, and handling data in their apps according to their own policies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">4.3 Third-Party Links</h3>
                  <p className="text-foreground/90">
                    The Service may contain links to third-party websites or resources. These links are provided for convenience only. Hanzo is not responsible for the content, accuracy, or practices of third-party sites. Accessing third-party links is at your own risk, and you should review their terms and privacy policies.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Purchases and Payments</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">5.1 Pricing and Availability</h3>
                  <p className="text-foreground/90">
                    Some apps or content available on the Hanzo Store may require payment ("Paid Apps"). Prices are displayed in the applicable currency and are subject to change without notice. Hanzo (or the app developer) reserves the right to modify pricing, discontinue Paid Apps, or offer promotions at any time. We will make reasonable efforts to ensure that pricing information is accurate, but errors may occur. If an error is discovered, we may cancel or refuse orders placed at the incorrect price.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">5.2 Payment Processing</h3>
                  <p className="text-foreground/90">
                    Payments for Paid Apps are processed through a third-party payment processor. By making a purchase, you authorize the payment processor to charge your selected payment method. You are responsible for ensuring that your payment information is accurate and up to date. Hanzo does not store your full credit card details—these are handled securely by our payment processor in compliance with industry standards (e.g., PCI-DSS).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">5.3 Refunds and Cancellations</h3>
                  <p className="text-foreground/90">
                    All sales are generally final. However, in certain circumstances (such as if an app is defective, not as described, or violates our guidelines), you may request a refund. Refund requests should be submitted to support@shinkai.com within 14 days of purchase, and we will review each case individually. Approval of refunds is at Hanzo's sole discretion. Please note that once you have downloaded or accessed a Paid App, you may not be eligible for a refund unless there is a demonstrable issue. For subscription-based apps (if any), cancellation policies may vary; please review the specific app's terms.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">5.4 Taxes</h3>
                  <p className="text-foreground/90">
                    You are responsible for any applicable taxes (such as sales tax, VAT, or other local taxes) related to your purchases, unless otherwise stated at checkout. Hanzo may collect taxes as required by law and remit them to the appropriate tax authorities.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">6.1 Hanzo's Intellectual Property</h3>
                  <p className="text-foreground/90">
                    All content, features, and functionality of the Hanzo Store (including but not limited to text, graphics, logos, icons, images, audio, video, software code, and the overall design and "look and feel") are owned by Hanzo or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of this material without our prior written consent, except as necessary for your personal, non-commercial use of the Service as intended.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">6.2 Trademarks</h3>
                  <p className="text-foreground/90">
                    "Hanzo," "Hanzo Store," and related logos, product names, and service names are trademarks or registered trademarks of Hanzo Industries Inc. You may not use these trademarks without our prior written permission. Third-party trademarks appearing on the Service are the property of their respective owners.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">6.3 Digital Millennium Copyright Act (DMCA) Notice</h3>
                  <p className="text-foreground/90 mb-2">
                    If you believe that any content on the Hanzo Store infringes your copyright, please send a notice to our designated copyright agent including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li>A description of the copyrighted work you claim has been infringed.</li>
                    <li>The location (URL or other identifier) of the infringing material on the Hanzo Store.</li>
                    <li>Your contact information (name, address, telephone number, and email).</li>
                    <li>A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                    <li>Your physical or electronic signature.</li>
                  </ul>
                  <p className="text-foreground/90 mt-2">
                    Send DMCA notices to: dmca@shinkai.com. We will investigate and take appropriate action, which may include removing or disabling access to the allegedly infringing content.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Privacy and Data Protection</h2>
              <p className="text-foreground/90 mb-4">
                Your privacy is important to us. Our collection, use, and disclosure of personal information is governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. By using the Hanzo Store, you consent to the practices described in the Privacy Policy. Please review it to understand how we handle your data.
              </p>
              <p className="text-foreground/90">
                In particular, note that Third-Party Apps may have their own privacy policies and may collect or use your data independently of Hanzo. We encourage you to review those policies before using any Third-Party App. Hanzo is not responsible for the privacy practices of third-party developers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimers and Limitation of Liability</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">8.1 "As Is" and "As Available"</h3>
                  <p className="text-foreground/90">
                    THE HANZO STORE AND ALL CONTENT, APPS, AND SERVICES PROVIDED THROUGH IT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, HANZO DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                  </p>
                  <p className="text-foreground/90 mt-2">
                    We do not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses or other harmful components. We do not guarantee the accuracy, completeness, or reliability of any content on the Hanzo Store. Your use of the Service is at your own risk.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">8.2 Third-Party App Disclaimer</h3>
                  <p className="text-foreground/90">
                    HANZO EXPRESSLY DISCLAIMS ANY RESPONSIBILITY OR LIABILITY FOR THIRD-PARTY APPS AVAILABLE THROUGH THE HANZO STORE. WE DO NOT ENDORSE, WARRANT, OR GUARANTEE THE QUALITY, SAFETY, OR LEGALITY OF THIRD-PARTY APPS. ANY ISSUES, DAMAGES, OR LOSSES ARISING FROM YOUR USE OF A THIRD-PARTY APP ARE SOLELY BETWEEN YOU AND THE APP'S DEVELOPER.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">8.3 Limitation of Liability</h3>
                  <p className="text-foreground/90 mb-2">
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL HANZO (INCLUDING OUR OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES) BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li>Your use of or inability to use the Hanzo Store;</li>
                    <li>Any Third-Party App or content;</li>
                    <li>Unauthorized access to or alteration of your data or transmissions;</li>
                    <li>Any other matter relating to the Service;</li>
                  </ul>
                  <p className="text-foreground/90 mt-2">
                    WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT HANZO HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
                  </p>
                  <p className="text-foreground/90 mt-2">
                    IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, HANZO'S LIABILITY SHALL BE LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW. IN ANY CASE, HANZO'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO HANZO (IF ANY) IN THE TWELVE (12) MONTHS PRIOR TO THE EVENT GIVING RISE TO LIABILITY, OR FIFTY US DOLLARS ($50), WHICHEVER IS GREATER.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
              <p className="text-foreground/90">
                You agree to indemnify, defend, and hold harmless Hanzo and its officers, directors, employees, agents, affiliates, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or in connection with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 my-4">
                <li>Your violation of these Terms;</li>
                <li>Your use of the Hanzo Store or any Third-Party App;</li>
                <li>Your violation of any law or the rights of any third party;</li>
                <li>Any content you submit or actions you take using the Service.</li>
              </ul>
              <p className="text-foreground/90">
                This indemnification obligation will survive the termination or expiration of these Terms and your use of the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">10. Dispute Resolution and Governing Law</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">10.1 Governing Law</h3>
                  <p className="text-foreground/90">
                    These Terms and any disputes arising out of or related to the Hanzo Store shall be governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., the State of California, United States], without regard to its conflict of law provisions. If you are located outside [Your Jurisdiction], you agree that any legal action or proceeding shall be brought exclusively in the courts located in [Your Jurisdiction], and you consent to the personal jurisdiction of those courts.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">10.2 Arbitration (Optional)</h3>
                  <p className="text-foreground/90">
                    [If your company wishes to include an arbitration clause, you can specify it here. For example: "Any dispute arising from these Terms will be resolved through binding arbitration in accordance with the rules of [Arbitration Association], rather than in court, except that you may assert claims in small claims court if they qualify." Otherwise, you can omit this or clarify that disputes may be brought in court.]
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">10.3 Class Action Waiver</h3>
                  <p className="text-foreground/90">
                    To the extent permitted by law, you agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">11. Miscellaneous</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">11.1 Entire Agreement</h3>
                  <p className="text-foreground/90">
                    These Terms, together with our Privacy Policy and App Store Guidelines, constitute the entire agreement between you and Hanzo regarding the use of the Hanzo Store and supersede any prior agreements or understandings.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">11.2 Severability</h3>
                  <p className="text-foreground/90">
                    If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions will remain in full force and effect.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">11.3 Waiver</h3>
                  <p className="text-foreground/90">
                    No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term. Hanzo's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">11.4 Assignment</h3>
                  <p className="text-foreground/90">
                    You may not assign or transfer these Terms or your rights under them without Hanzo's prior written consent. Hanzo may assign these Terms or any rights under them at any time without notice (for example, in connection with a merger or acquisition).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">11.5 Contact Information</h3>
                  <p className="text-foreground/90">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <ul className="list-none pl-0 space-y-1 text-foreground/90 mt-2">
                    <li><strong>Email:</strong> legal@shinkai.com</li>
                    <li><strong>Support:</strong> support@shinkai.com</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground pt-8 border-t">
              <p className="mb-4">
                By using the Hanzo Store, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them. Thank you for being part of our community.
              </p>
              <p>
                <strong>Hanzo Industries Inc.</strong><br />
                Last Updated: February 2025
              </p>
            </div>
          </section>
        </article>

        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="mb-2">© 2025 Hanzo Industries Inc. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <Link href="/guidelines" className="hover:text-foreground">
              Guidelines
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
