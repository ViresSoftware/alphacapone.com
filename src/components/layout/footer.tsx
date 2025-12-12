import Image from "next/image";
import Link from "next/link";
import { Bot, Coins, Gem } from "lucide-react";

const navItems = [
  // { 
  //   href: "/investments/artificial-intelligence", 
  //   label: "Artificial Intelligence",
  //   colors: "hover:text-blue-500",
  //   icon: Bot,
  // },
  // { 
  //   href: "/investments/cryptocurrencies", 
  //   label: "Cryptocurrency",
  //   colors: "hover:text-orange-500",
  //   icon: Coins,
  // },
  // { 
  //   href: "/investments/gold", 
  //   label: "Gold",
  //   colors: "hover:text-yellow-500",
  //   icon: Gem,
  // },
  // { 
  //   href: "/commodities", 
  //   label: "Commodities",
  //   colors: "hover:text-green-500",
  //   icon: Package,
  // },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-card py-10 px-4 text-sm">
      <div className="max-w-6xl flex flex-col space-y-4 mx-auto sm:justify-between mb-10 items-center">
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <Link href="/#hero" scroll={true}>
            <Image src={'/logo/logo-metallic-steel.png'} alt="Alpha Capital One Logo" width={130} height={40} priority />
          </Link>
          {/* <p className="font-playfair text-muted-foreground text-xs mt-[-10px] mx-auto">Established 2020</p> */}
        </div>
        <nav className="text-md font-medium text-muted-foreground flex flex-col sm:flex-row sm:gap-6 items-center">
          {navItems.map(({ href, label, colors, icon: Icon }) => (
            <Link 
              key={href} 
              href={href} 
              scroll={true} 
              className={`${colors} transition-colors duration-300 flex items-center gap-2 group`}
            >
              {Icon && <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />}
              {label}
            </Link>
          ))}
        </nav>
        {/* <div className="text-md text-muted-foreground leading-relaxed flex items-center gap-2 sm:w-[33%] md:w-[25%]">
          <Building2 size={18} />
          <p>Nevis, West Indies</p>
        </div> */}
      </div>
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">DISCLAIMER: This site is general in nature and not tailored to the specific goals of any individual. All investments carry risk. Some of those risks associated with precious metals include the following: prices may rise and fall, which means the value of your metals may go up or down over time and you may sell for more or less than you paid. Past performance does not guarantee future results. Goldco cannot guarantee, assure, or promise future market movement, prices, or profits. Even though Goldco and its representatives are precious metals specialists, we are not licensed financial advisors and do not give financial advice. Additionally, Goldco cannot provide tax or legal advice and will not advise as to the tax or legal consequences of purchasing or selling precious metals or opening a Precious Metals IRA. Individuals should consult with their investment, legal or tax professionals for such services.</p>
      </div>
      <div className="mt-6 text-center space-y-1 text-xs">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Alpha Capital One. All rights reserved.
        </p>
        <p className="text-[#b28f3f]">
          This site is confidential and monitored. Unauthorized use is prohibited.
        </p>
        <a
          href="/privacy"
          className="underline opacity-50 hover:opacity-100"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
