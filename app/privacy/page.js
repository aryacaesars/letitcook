import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-50">
      <Header />
      <main className="container flex-grow px-6 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-8 text-5xl font-extrabold text-center text-gray-800">
            Privacy & Policy
          </h1>
          <p className="mb-12 text-lg text-center text-gray-600">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed text-gray-600">
                We collect information that you provide directly to us, such as
                when you create an account, fill out a form, or communicate with
                us. This may include your name, email address, and any other
                details you choose to share.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed text-gray-600">
                We use the information we collect to provide, maintain, and
                improve our services. This includes personalizing your
                experience, sending updates, and responding to your inquiries.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                3. Sharing Your Information
              </h2>
              <p className="leading-relaxed text-gray-600">
                We do not share your personal information with third parties
                except as necessary to provide our services or as required by
                law.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                4. Security
              </h2>
              <p className="leading-relaxed text-gray-600">
                We take reasonable measures to protect your information from
                unauthorized access, loss, or misuse. However, no system is
                completely secure, and we cannot guarantee the absolute security
                of your information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                5. Changes to This Policy
              </h2>
              <p className="leading-relaxed text-gray-600">
                We may update this Privacy Policy from time to time. We
                encourage you to review this page periodically for any changes.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}