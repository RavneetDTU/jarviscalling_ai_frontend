export default function TermsOfService() {
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
                        Terms of Service
                    </h2>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p className="text-base md:text-lg">
                            By using this application, you agree to use it lawfully and
                            responsibly.
                        </p>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Service Provision
                            </h3>
                            <ul className="list-disc list-inside space-y-2 pl-2">
                                <li>
                                    The service is provided &quot;as is&quot; without warranties.
                                </li>
                                <li>
                                    We are not liable for scheduling errors or data inaccuracies.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Updates and Changes
                            </h3>
                            <p className="pl-2">
                                We may update these terms at any time. Continued use of the
                                application constitutes acceptance of any changes.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Contact
                            </h3>
                            <p className="text-base">
                                For any questions regarding these terms, please contact us at:{" "}
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
