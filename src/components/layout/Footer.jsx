import { Facebook, Instagram, Twitter } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-green-500 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1 */}
                    <div>
                        <h3 className="font-bold mb-4">Về GrabFood</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-200">Về GrabFood</a></li>
                            <li><a href="#" className="hover:text-gray-200">Về Grab</a></li>
                            <li><a href="#" className="hover:text-gray-200">Blog</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="font-bold mb-4">Mở quán trên GrabFood</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-200">Trở thành tài xế Grab</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="font-bold mb-4">Trung tâm hỗ trợ</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-200">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Social Media & App Links */}
                    <div>
                        <h3 className="font-bold mb-4">Theo dõi chúng tôi</h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="hover:text-gray-200"><Facebook /></a>
                            <a href="#" className="hover:text-gray-200"><Instagram /></a>
                            <a href="#" className="hover:text-gray-200"><Twitter /></a>
                        </div>
                        <div className="space-y-2">
                            <a href="#" className="block">
                                <img src="/app-store-badge.png" alt="Download on App Store" className="h-10" />
                            </a>
                            <a href="#" className="block">
                                <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p>© 2025 Grab</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-200">Câu hỏi thường gặp</a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-200">Chính sách bảo mật</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;