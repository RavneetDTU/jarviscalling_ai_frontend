export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
            {/* Header */}
            <header className="w-full px-4 py-4 md:px-6 md:py-5 border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
                        JarvisCalling AI
                    </h1>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Privacy Policy
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p className="text-base md:text-lg">
                            This application collects and processes user data only to provide
                            its core functionality.
                        </p>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Google Calendar Data
                            </h3>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>
                                    We access Google Calendar data in read-only mode to display
                                    users&apos; scheduled events and availability inside the
                                    application.
                                </li>
                                <li>
                                    We do not modify, delete, or share calendar data.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Data Usage
                            </h3>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>Data is not used for advertising or sold to third parties.</li>
                                <li>
                                    Users may revoke access at any time from their Google Account
                                    settings.
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Contact
                            </h3>
                            <p className="text-base">
                                For any privacy-related questions or concerns, please contact us at:{" "}
                                <a
                                    href="mailto:support@jarviscalling.ai"
                                    className="text-indigo-600 hover:text-indigo-700 font-medium underline"
                                >
                                    support@jarviscalling.ai
                                </a>
                            </p>
                        </div>

                        <div className="pt-4">
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-4xl mx-auto px-4 py-6 md:px-6 text-center">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} JarvisCalling AI. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
