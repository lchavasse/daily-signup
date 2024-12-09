'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-[90%] max-w-2xl p-8 bg-white rounded-lg shadow-lg text-gray-600">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy for Daily</h1>

        <p className="mb-6">
          We at daily value your privacy and are committed to protecting your personal data.
          In handling your most private personal thoughts we take a maximalist approach to privacy.
          Your entries are securely encrypted by default (with your device specific key), and only by opting in to our additional features will that ever not be the case.
          Whilst they are in beta, we are necessarily forgoing some of our usual privacy measures to expand functionality.
          <br />
          This Privacy Policy explains how we
          collect, use, and protect your information in compliance with the UK General Data Protection Regulation (UK GDPR)
          and the EU General Data Protection Regulation (EU GDPR).
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Data We Collect</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">a) Email Address</h3>
          <p>Purpose: Used for account authentication and communication related to your account.</p>
          <p>Storage: Securely stored and used solely for login and communication purposes.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">b) Journal Entries</h3>
          <p><strong>Default Handling:</strong> Your journal entries are encrypted on your device using a unique key, ensuring they
            cannot be accessed without the device or key.</p>
          <p><strong>Optional AI Services:</strong> If you opt to use AI features, your journal entries are decrypted and sent to
            our partners for analysis. These partners do not retain your data after processing.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">c) Voice Data</h3>
          <p>Purpose: Voice data is sent to our partners at OpenAI for transcription and processing when you use voice-to-text
            features.</p>
          <p>Retention: Voice data is not stored or saved by us or our partners after processing.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">d) Anonymous Usage Data</h3>
          <p>Purpose: We collect anonymized data to improve app functionality and user experience, such as feature usage patterns
            and app performance metrics.</p>
          <p>Retention: This data is not linked to your identity and is stored securely for analysis.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900">e) Additional Data You Share</h3>
          <p>If you contact us through email or other communication methods, we may collect and store the data you choose to
            share (e.g., feedback, support requests). This data will be used solely for addressing your inquiries and improving
            our services.</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Your Data</h2>
        <ul className="list-disc list-inside mb-6">
          <li>To provide and enhance the features of the Daily app.</li>
          <li>To authenticate and secure your account.</li>
          <li>To deliver optional AI services and transcriptions, if enabled.</li>
          <li>To improve app functionality and user experience using anonymous usage data.</li>
          <li>To respond to your communications and feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Legal Basis for Processing</h2>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Consent:</strong> When you enable optional AI services, use voice features, or share data with us
            voluntarily through communication channels.</li>
          <li><strong>Contract:</strong> To provide core functionalities of the Daily app (e.g., authentication and storage of
            journal entries).</li>
          <li><strong>Legitimate Interests:</strong> To improve our app and user experience, where such interests are not
            overridden by your rights.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Sharing</h2>
        <ul className="list-disc list-inside mb-6">
          <li><strong>AI Services:</strong> Journal entries (decrypted) are shared with our partners solely for analysis when AI
            features are enabled. Data is not retained after processing.</li>
          <li><strong>Voice Services:</strong> Voice data is sent to OpenAI for transcription and processing. Data is not saved
            after processing.</li>
          <li><strong>Anonymous Usage Data:</strong> Aggregated and anonymized usage data may be shared with analytics tools to
            improve app functionality. This data cannot be used to identify you.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Retention</h2>
        <p className="mb-6">
          We retain your data for as long as you have an active account or as required to comply with legal obligations. Data
          processed for AI and voice features is not retained after use. Anonymous usage data may be retained for analytical
          purposes but cannot be linked to you.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Your Rights</h2>
        <ul className="list-disc list-inside mb-6">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Rectification:</strong> Request corrections to any inaccuracies in your personal data.</li>
          <li><strong>Erasure:</strong> Request deletion of your data at any time by contacting us at{' '}
            <a href="mailto:daily@nile-street.com" className="text-blue-500">daily@nile-street.com</a>.</li>
          <li><strong>Data Portability:</strong> Request to transfer your data to another service.</li>
          <li><strong>Restriction of Processing:</strong> Request to limit how your data is processed.</li>
          <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Data Security</h2>
        <p className="mb-6">
          We use encryption and other security measures to protect your data:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Journal entries are encrypted on your device by default.</li>
          <li>Data sent to third-party partners for optional AI or voice features is transmitted securely and is not retained
            after processing.</li>
          <li>Anonymous usage data is aggregated and stored securely.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Contact Us</h2>
        <p className="mb-6">
          If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
        </p>
        <p className="mb-6">
          <strong>Email:</strong> <a href="mailto:daily@nile-street.com" className="text-blue-500">daily@nile-street.com</a>
          <br />
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Changes to This Privacy Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. Significant changes will be communicated to you via email or app
          notifications.
        </p>

        <p className="mt-8 text-gray-600">
          By using the Daily app, you agree to this Privacy Policy.
        </p>
        <footer className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          Last updated: December 9, 2024
        </footer>
      </div>
    </div>
  );
}
