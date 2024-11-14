import { BsGithub, BsLinkedin, BsWhatsapp, BsTwitter, BsEnvelope } from 'react-icons/bs';

export const contactMethods = [
  {
    name: 'WhatsApp',
    icon: BsWhatsapp,
    href: 'https://wa.me/+2348130904201?text=Hi%20David!%20I%20found%20your%20portfolio%20website%20and%20would%20love%20to%20connect.',
    color: 'text-green-500',
    hoverColor: 'hover:bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    name: 'Email',
    icon: BsEnvelope,
    href: 'mailto:davidanyatonwu@gmail.com',
    color: 'text-purple-500',
    hoverColor: 'hover:bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    name: 'LinkedIn',
    icon: BsLinkedin,
    href: 'https://www.linkedin.com/in/david-anyatonwu-79165988/',
    color: 'text-blue-500',
    hoverColor: 'hover:bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    name: 'Twitter',
    icon: BsTwitter,
    href: 'https://x.com/David_Anyatonwu',
    color: 'text-sky-500',
    hoverColor: 'hover:bg-sky-500/10',
    borderColor: 'border-sky-500/20',
  },
  {
    name: 'GitHub',
    icon: BsGithub,
    href: 'https://github.com/onyedikachi-david',
    color: 'text-gray-400',
    hoverColor: 'hover:bg-gray-500/10',
    borderColor: 'border-gray-500/20',
  },
];

interface ContactMethodsProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export default function ContactMethods({ className = '', variant = 'default' }: ContactMethodsProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex gap-4 ${className}`}>
        {contactMethods.map((method) => (
          <a
            key={method.name}
            href={method.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${method.color} ${method.hoverColor} p-2.5 rounded-full transition-all duration-300 hover:scale-110`}
            aria-label={method.name}
          >
            <method.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {contactMethods.map((method) => (
        <a
          key={method.name}
          href={method.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 border ${method.borderColor} ${method.hoverColor} transition-all duration-300 hover:scale-[1.02] group`}
        >
          <method.icon className={`w-6 h-6 ${method.color} transition-transform duration-300 group-hover:scale-110`} />
          <span className="text-gray-200">{method.name}</span>
        </a>
      ))}
    </div>
  );
}
