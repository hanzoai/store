'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { HanzoLogo } from '@hanzo/logo/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              <strong>Last Updated:</strong> February 2025
            </p>
          </div>

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-foreground/90 mb-4">
                Welcome to Hanzo Store. This Privacy Policy explains what information we collect through the Hanzo Store (the "Store"), how we use and share that information, and the measures we take to protect your privacy. It also outlines your rights regarding your personal data. By using the Hanzo Store, you agree to the practices described in this policy. If you do not agree, please do not use the Store.
              </p>
              <p className="text-foreground/90">
                <strong>Scope:</strong> This policy applies to the Hanzo Store website, app, and related services provided by Hanzo. It covers data we collect from Store users (including those browsing, downloading, or purchasing applications). It does not cover the data practices of third-party developers who create applications ("apps") available on our Store – those are governed by the developers' own privacy policies (see Section 4).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-foreground/90 mb-4">
                We collect only the data necessary to operate the Store effectively and safely. This includes:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Account Information</h3>
                  <p className="text-foreground/90">
                    When you create a Hanzo Store account, we collect personal information such as your name, email address, username, and password. If you sign in via a third-party identity provider (e.g. Google or Microsoft), we receive basic profile info (like your email and name) from that service.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transaction and Payment Data</h3>
                  <p className="text-foreground/90">
                    If you purchase paid apps through the Store, we (or our third-party payment processor) collect payment details. This may include billing name, billing address, and payment method information. Note: Hanzo Store itself does not store your full credit card numbers – payments are handled securely by accredited payment processors.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Store Usage Data</h3>
                  <p className="text-foreground/90">
                    We log data about your interactions with the Store, such as the apps you browse or download, search queries, pages viewed, and the dates/times of actions. We may also record clicks on links or other UI interactions to understand usage patterns.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Device and Technical Data</h3>
                  <p className="text-foreground/90">
                    When you use the Store, we automatically receive technical information about your device and software. This includes data like your device type, operating system version, unique device identifiers, IP address, and browser type (if using the web). We collect this to ensure compatibility and for security (e.g., fraud detection, preventing unauthorized access).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Error and Analytics Data</h3>
                  <p className="text-foreground/90">
                    If the Store app encounters an error or crash, we may collect a crash report and diagnostic details to troubleshoot (these reports do not intentionally include personal content, only technical info). With your consent, we might also collect anonymized analytics on how you use the Store (e.g. performance metrics, feature usage frequency) to improve our services. You will have the ability to opt-in or opt-out of such analytics.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Communications</h3>
                  <p className="text-foreground/90">
                    If you contact Hanzo support or communicate with us (for example, via email or through a feedback form), we will collect the information you provide (such as your contact details and the content of your message). We use this to respond to you and improve our support services.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">User-Generated Content</h3>
                  <p className="text-foreground/90">
                    Some parts of the Store may allow you to submit content (e.g., posting reviews or ratings for apps). Such content may be public or semi-public and can be seen by other users. We will associate this content with your account profile (e.g., your username). Please avoid sharing sensitive personal information in these areas.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Local Execution and AI</h3>
                  <p className="text-foreground/90">
                    Notably, the Hanzo Store primarily distributes apps that run on your device using AI technology, rather than running on Hanzo's servers. This means that any data you input into those apps or generate by using them typically stays on your own device. Hanzo does not automatically collect the content you create within third-party apps. However, if an app requires cloud-based processing or external services, some data may leave your device – in those cases, that data is handled by the app's developer or service (see Section 4 on Third-Party Apps).
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-foreground/90 mb-4">
                Hanzo uses the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-foreground/90">
                <li><strong>Providing and Improving the Service:</strong> We use your data to operate the Hanzo Store and provide you with the features you expect. For example, your account information allows you to log in and manage your app library; your device information helps us deliver compatible app versions; and usage data helps us understand what apps or categories are popular.</li>
                <li><strong>Processing Transactions:</strong> If you download or purchase an app, we use your account and payment information to facilitate the transaction, process payments (through our payment provider), send you purchase receipts, and ensure you can access the app or license.</li>
                <li><strong>Communications:</strong> We use contact information (email, name) to send you service-related communications. These include confirmations of transactions, updates about apps you've downloaded (e.g., update notifications or important security notices), and information about changes to our policies or terms.</li>
                <li><strong>Customer Support:</strong> Information you provide in support requests is used to assist you. Support records are kept so we can follow up and improve our services.</li>
                <li><strong>Security and Abuse Prevention:</strong> We may use usage and device data to monitor for fraudulent or malicious activity. If we detect potential security issues or violations of our policies, we may use relevant data to investigate and take appropriate action.</li>
                <li><strong>Compliance with Law:</strong> Where required, we will use and disclose information to comply with legal obligations.</li>
                <li><strong>Aggregated Analytics:</strong> We may use collected data in an aggregated and anonymized form (so it cannot reasonably identify you) to understand trends and improve decision-making.</li>
              </ul>
              <p className="text-foreground/90 mt-4">
                We do not use your personal data for any purposes incompatible with those described above. In particular, we do not sell your personal information to third parties for their own marketing or profit.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Information to Third Parties</h2>
              <p className="text-foreground/90 mb-4">
                Hanzo understands the importance of keeping your data private. We only share personal information with third parties in a few specific situations:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">With App Developers (Publishers)</h3>
                  <p className="text-foreground/90">
                    When you download or purchase a third-party app from the Hanzo Store, we may need to share limited information about you with the app's developer to facilitate the download or use of the app. Any personal data that we share with an app developer is provided only as needed for them to support you.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Third-Party Apps' Own Data Practices</h3>
                  <p className="text-foreground/90">
                    When you use a third-party app, any information that app accesses or generates falls under the app developer's responsibility. Hanzo does not collect nor receive the content you process in third-party apps. We strongly advise you to review each app's Privacy Policy.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">With Service Providers</h3>
                  <p className="text-foreground/90">
                    We share information with third-party service providers who help us run the Hanzo Store. These companies only process your data under our instructions and for the purposes outlined in this policy. Key service providers include hosting, payment processors, email services, and analytics.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">For Legal Reasons</h3>
                  <p className="text-foreground/90">
                    We may disclose personal information to outside parties when required by law or necessary to protect rights.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
              <p className="text-foreground/90 mb-4">
                We respect your privacy rights and provide you with ways to exercise control over your personal information. Depending on your jurisdiction, you may have some or all of the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Access and Portability:</strong> You can request a copy of the personal data we hold about you.</li>
                <li><strong>Correction (Rectification):</strong> If any personal data we have is inaccurate or outdated, you have the right to request a correction.</li>
                <li><strong>Deletion (Right to be Forgotten):</strong> You may request that we delete your personal information.</li>
                <li><strong>Objection to Processing:</strong> You have the right to object to certain processing of your data, such as for direct marketing.</li>
                <li><strong>Restriction of Processing:</strong> You can ask us to limit processing of your data in certain scenarios.</li>
                <li><strong>Data Portability:</strong> Where applicable, you may request to receive the data you have provided to us in a portable format.</li>
                <li><strong>Withdraw Consent:</strong> If we are processing any of your personal data based on your consent, you have the right to withdraw that consent at any time.</li>
              </ul>
              <p className="text-foreground/90 mt-4">
                <strong>Exercising Your Rights:</strong> You can exercise many of the above rights through self-service or by contacting us at privacy@shinkai.com.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-foreground/90">
                The Hanzo Store website uses cookies and similar technologies to provide and optimize the service. Cookies are small text files placed on your device that help us recognize you on subsequent visits, keep you logged in, and understand usage. You have control over cookie usage through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Security Measures</h2>
              <p className="text-foreground/90 mb-4">
                We take the security of your personal information seriously. Hanzo implements a variety of technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, and destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Encryption:</strong> We encrypt sensitive data in transit using HTTPS/TLS and at rest in our databases.</li>
                <li><strong>Access Controls:</strong> We limit access to personal data to authorized personnel only.</li>
                <li><strong>Security Testing:</strong> Our systems are routinely updated with security patches.</li>
                <li><strong>Data Backups:</strong> We perform regular encrypted backups of critical data.</li>
              </ul>
              <p className="text-foreground/90 mt-4">
                Despite all these precautions, no method of transmission over the internet is completely secure. While we strive to protect your personal information, we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links and Services</h2>
              <p className="text-foreground/90">
                The Hanzo Store may contain links to third-party websites or services. This Privacy Policy does not apply to any external sites or services that we do not operate. We are not responsible for the content, security, or privacy practices of those third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-foreground/90">
                The Hanzo Store is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you are under 13, you should not create an account or use our services. If we become aware that we have inadvertently collected personal data from a child under 13 without proper parental consent, we will take steps to delete that information as soon as possible.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
              <p className="text-foreground/90">
                Hanzo is a company that may operate globally. The data we collect from you may be transferred to, stored, and processed in countries other than your own. To safeguard your privacy, we ensure that any international transfers of personal data are done in compliance with applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">11. Updates to This Policy</h2>
              <p className="text-foreground/90">
                We may occasionally update or revise this Privacy Policy to reflect changes in our practices, technologies, legal requirements, or for other operational reasons. When we update the policy, we will change the "Last Updated" date at the top of this document. If the changes are significant, we will provide a more prominent notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">12. Disclaimer and Limitation of Liability</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Use at Your Own Risk</h3>
                  <p className="text-foreground/90">
                    While we are committed to protecting your data and providing a safe platform, the Hanzo Store is provided on an "as is" and "as available" basis. We make no warranty that the Store will be error-free, uninterrupted, or completely secure.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Third-Party Apps</h3>
                  <p className="text-foreground/90">
                    Hanzo disclaims responsibility for third-party developers and apps. Each app in the Store is created by an independent developer who is solely responsible for that app's functionality and data practices.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-foreground/90">
                    To the maximum extent allowed by applicable law, Hanzo will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues resulting from your use of the Hanzo Store.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="text-foreground/90 mb-4">
                Your privacy is important to us. If you have any questions, concerns, or feedback regarding this Privacy Policy or how we handle your data, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-1 text-foreground/90">
                <li><strong>Email:</strong> privacy@shinkai.com</li>
                <li><strong>Support:</strong> You can also reach out via our support page on the Hanzo Store website/app.</li>
              </ul>
              <p className="text-foreground/90 mt-4">
                Thank you for using Hanzo Store. We are committed to earning and maintaining your trust by respecting your privacy and keeping your personal information safe.
              </p>
            </div>

            <div className="text-sm text-muted-foreground pt-8 border-t">
              <p>
                <strong>© 2025 Hanzo Industries Inc. All rights reserved.</strong>
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
