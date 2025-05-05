'use client';

export default function PrivacyPage () {
    return (
        <main className="bg-[#111] text-gray-300 px-6 py-12 max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-semibold text-white">Privacy Policy</h1>

            <p>
                We respect your privacy. This site does not collect personal data without your explicit consent.
            </p>

            <section>
                <h2 className="text-xl font-semibold text-white">Forms</h2>
                <p>
                    When you use the contact form, the data you provide (such as your name, email, phone number, timeline,
                    and project details) is stored on our server solely to respond to your inquiry. It is not shared with third parties.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">Ask About My Experience</h2>
                <p>
                    Questions and answers submitted through the Ask section are stored on our server to improve the user experience
                    and allow you to revisit past conversations. These are not used for analytics or shared externally.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">Cookies</h2>
                <p>
                    We do not use cookies for analytics or advertising.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">Data Retention</h2>
                <p>
                    Contact form submissions and conversation logs are stored for up to 30 days and then permanently deleted.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-white">Data Rights</h2>
                <p>
                    You can contact us at <a className="text-orange-500 underline" href="mailto:volodymyr@stishkovskyi.com">volodymyr@stishkovskyi.com</a> to request access,
                    deletion, or correction of your data.
                </p>
            </section>

            <p>
                This site complies with the General Data Protection Regulation (GDPR).
            </p>
        </main>
    );
}
