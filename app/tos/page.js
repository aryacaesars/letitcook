
export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      <main className="container flex-grow px-6 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-5xl font-extrabold text-center text-gray-800">
            Terms of Service
          </h1>
          <p className="mb-12 text-lg text-center text-gray-600">
            Please read these Terms of Service carefully before using our
            platform. By accessing or using our services, you agree to be bound
            by these terms.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed text-gray-600">
                By accessing or using our platform, you agree to comply with
                and be bound by these Terms of Service. If you do not agree
                with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                2. Changes to Terms
              </h2>
              <p className="leading-relaxed text-gray-600">
                We reserve the right to modify these terms at any time. Any
                changes will be effective immediately upon posting. Your
                continued use of the platform constitutes your acceptance of
                the updated terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                3. User Responsibilities
              </h2>
              <p className="leading-relaxed text-gray-600">
                You agree to use the platform only for lawful purposes and in a
                manner that does not infringe the rights of others or restrict
                their use and enjoyment of the platform.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                4. Intellectual Property
              </h2>
              <p className="leading-relaxed text-gray-600">
                All content on this platform, including text, graphics, logos,
                and images, is the property of Let IT Cook or its content
                suppliers and is protected by copyright and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                5. Limitation of Liability
              </h2>
              <p className="leading-relaxed text-gray-600">
                We are not liable for any damages arising from your use of the
                platform or inability to access the platform. This includes
                direct, indirect, incidental, and consequential damages.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                6. Termination
              </h2>
              <p className="leading-relaxed text-gray-600">
                We reserve the right to terminate or suspend your access to the
                platform at our sole discretion, without notice, for conduct
                that we believe violates these terms or is harmful to other
                users.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}