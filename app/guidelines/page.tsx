'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { HanzoLogo } from '@hanzo/logo'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Card, CardContent, CardHeader } from '@hanzo/ui'

export default function GuidelinesPage() {
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
            <h1 className="text-4xl font-bold mb-4">App Store Guidelines</h1>
            <p className="text-muted-foreground">
              <strong>Note:</strong> These guidelines apply to all submissions—apps, tools, agents, or other products—intended for distribution via the Hanzo App Store. By submitting your product, you agree to follow all guidelines outlined herein.
            </p>
            <p className="text-muted-foreground">
              Please read each section thoroughly before you submit.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-2xl font-semibold">Quick Checklist</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>Complete the App's name, description, keywords, and other information.</li>
                <li>Thoroughly test your app for crashes or major bugs on relevant devices or environments.</li>
                <li>Provide demo access or test credentials if your app requires any login or special configuration (only for Hanzo reviewers)</li>
                <li>If paid app, you must include a valid support link or email address, and ensure all contact details are up to date.</li>
                <li>Double-check that you have the rights to all third-party content (licenses, media, etc.).</li>
                <li>Confirm your app follows all Hanzo App Store guidelines and any local legal requirements.</li>
                <li>Prepare the icon and necessary screenshots or presentation screens (minimum one) following the 16:9 ratio.</li>
                <li>You must have a valid Hanzo Identity and it must match the App Metadata</li>
                <li>Create an account at store.shinkai.com</li>
              </ul>
            </CardContent>
          </Card>

          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-foreground/90 mb-4">
                At Hanzo, our goal is to create a safe, trusted, and diverse ecosystem for developers and users alike. We believe high-quality submissions should:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li>Provide value and enjoyment for end users.</li>
                <li>Respect user privacy, security, and safety.</li>
                <li>Comply with applicable laws, regulations, and ethical standards.</li>
                <li>Emphasize consistency, performance, and reliability.</li>
              </ul>
              <p className="text-foreground/90 mt-4">
                We encourage innovation, but also prioritize the well-being of our user community. Submissions that fail to follow these guidelines may be delayed, rejected, or removed from the Hanzo App Store at any time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Before You Submit</h2>
              <h3 className="text-xl font-semibold mb-2">2.1 Testing and Stability</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
                <li><strong>Thorough Testing:</strong> Ensure your product is stable, free of major bugs, and tested on relevant devices or environments.</li>
                <li><strong>Demo Access:</strong> If your submission requires special credentials, test accounts, or hardware, you must provide a demo or test mode.</li>
                <li><strong>Metadata Accuracy:</strong> Confirm that your product's title, description, icons, and other materials accurately reflect its features and functionality.</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">2.2 Compliance Checklist</h3>
              <p className="text-foreground/90 mb-2">Before submitting, make sure you:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                <li><strong>Provide Contact Details:</strong> If your app is paid, you must include a valid support email or URL for inquiries and assistance.</li>
                <li><strong>Prepare Documentation:</strong> Clearly document any technical or advanced configuration steps.</li>
                <li><strong>Obtain Necessary Licenses:</strong> If your product uses licensed content (e.g., media, libraries), confirm you have the right to distribute it.</li>
                <li><strong>Address Regional Requirements:</strong> If distributing your product in regions with specific legal requirements (e.g., gambling, financial services, health data), ensure full compliance with local laws and regulations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Safety, Content, and Usage</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">3.1 User Safety and Well-Being</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Harmful or Illegal Behavior:</strong> Products promoting violence, harassment, or illegal activities are strictly prohibited.</li>
                    <li><strong>Physical Harm:</strong> Tools or functionalities that could endanger users (e.g., bypassing critical safety features of a device) will be rejected.</li>
                    <li><strong>Medical Use:</strong> If your product falls under the "Medical" category or claims health-related benefits, it may undergo additional scrutiny. Ensure accuracy and disclose any limitations or disclaimers.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">3.2 Inappropriate Content</h3>
                  <p className="text-foreground/90 mb-2">Submissions must not include:</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Hate Speech:</strong> Content that targets or advocates harm against individuals or groups.</li>
                    <li><strong>Illegal or Restricted Goods:</strong> Any facilitation of transactions involving regulated or prohibited items.</li>
                    <li><strong>Shocking or Graphically Violent Material:</strong> Excessive or disturbing depictions of violence, torture, or abuse.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">3.3 User-Generated Content</h3>
                  <p className="text-foreground/90 mb-2">If your product allows user-generated content, you must:</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li>Provide a way to report and filter objectionable or illegal content.</li>
                    <li>Offer a method to block or ban abusive users.</li>
                    <li>Respond promptly to user reports.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">3.4 Originality</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li>Apps must offer unique functionality or present existing functionality in a genuinely new or enhanced way.</li>
                    <li>Apps that are merely copies or slight variations of existing apps without adding distinct value will be rejected.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Performance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">4.1 Completeness</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Full Functionality:</strong> Submissions should not be "beta," "demo," or placeholders. All primary features must be present, functional, and ready for review.</li>
                    <li><strong>No Crashes or Errors:</strong> Apps, tools, or agents must not unexpectedly crash or produce persistent errors.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">4.2 Resource Usage</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Efficiency:</strong> Your submission should not excessively consume CPU, battery, or network resources, aside from AI computation.</li>
                    <li><strong>No Hidden Processes:</strong> Do not run unrelated background tasks.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">4.3 Compatibility</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90">
                    <li><strong>Target Platforms:</strong> Indicate clearly which platforms or environments your product supports and confirm testing has been done on those platforms.</li>
                    <li><strong>Respect System Behavior:</strong> Submissions may not override or interfere with user settings or typical device behavior without explicit user consent.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Continue with remaining sections... */}
            <div className="text-sm text-muted-foreground pt-8 border-t">
              <p className="mb-4">
                By submitting a product to the Hanzo App Store, you affirm that you have read and will abide by these guidelines. You are also responsible for complying with any additional or evolving legal, regulatory, or policy requirements.
              </p>
              <p>
                Thank you for choosing the Hanzo App Store. We're excited to see what you'll create!
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
