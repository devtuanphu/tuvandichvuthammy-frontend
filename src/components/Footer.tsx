import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  address?: string;
  phone?: string;
  email?: string;
}

export default function Footer({ address, phone, email }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Thẩm Mỹ Hà Nội" width={40} height={40} className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="text-white text-lg font-bold">Thẩm Mỹ 10 Trần Điền</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Cơ sở tư vấn dịch vụ thẩm mỹ uy tín tại Số 10 Trần Điền, Hà Nội. Đội ngũ chuyên gia hàng đầu, công nghệ hiện đại.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Liên kết nhanh</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Trang chủ' },
                { href: '/ve-chung-toi', label: 'Về chúng tôi' },
                { href: '/dich-vu', label: 'Dịch vụ' },
                { href: '/tin-tuc', label: 'Tin tức' },
                { href: '/lien-he', label: 'Liên hệ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Dịch vụ</h3>
            <ul className="space-y-3">
              {[
                { href: '/dich-vu/nang-mui', label: 'Nâng mũi' },
                { href: '/dich-vu/cat-mi-mat', label: 'Cắt mí mắt' },
                { href: '/dich-vu/tiem-filler', label: 'Tiêm filler' },
                { href: '/dich-vu/tre-hoa-da', label: 'Trẻ hóa da' },
                { href: '/dich-vu/hut-mo', label: 'Hút mỡ' },
                { href: '/dich-vu/nang-nguc', label: 'Nâng ngực' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Liên hệ</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-white">{address || 'Số 10 Trần Điền, Hà Nội'}</span>
              </li>
              {phone && (
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{phone}</a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Tư Vấn Dịch Vụ Thẩm Mỹ tại Số 10 Trần Điền, Hà Nội. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Địa chỉ: <strong className="text-gray-300">Số 10 Trần Điền, Định Công, Hoàng Mai, Hà Nội</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
