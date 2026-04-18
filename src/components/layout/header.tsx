"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu, X, Lock, Send, Package, FileStack } from "lucide-react";
import LoginForm from "@/components/form/Login";
import { SteelButton } from "../SteelButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      console.log('handleSmoothScroll')
      const anchor = (e.target as HTMLElement).closest("a[href^='/#'], a[href^='#']") as HTMLAnchorElement;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || (!href.startsWith("#") && !href.startsWith("/#"))) return;
      const targetId = href.replace(/^\/?#/, "");
      const targetElement = document.getElementById(targetId);
      const header = document.getElementById("main-header");
      if (targetElement && header) {
        e.preventDefault();
        const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  const navItems = [
    {
      href: "/services",
      label: "Serivces",
      colors: "hover:text-white",
      icon: Package,
    },
    {
      href: "/non-qm-loan-acquisitions",
      label: "Non-QM Loans",
      colors: "hover:text-white",
      icon: FileStack,
    },
    {
      href: "/contact",
      label: "Contact",
      colors: "hover:text-white",
      icon: Send,
    },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 w-full z-50 text-white py-4 ${
        scrolled || menuOpen ? "bg-black" : "bg-transparent"
      }`}
      style={{ transition: 'all 500ms' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-0">
        {/* Logo */}
        <Link href="/" scroll={true} className="flex items-center space-x-2">
          <Image src={'/logo/logo-metallic-black-bg.png'} alt="Alpha Capital One" width={128} height={40} priority />
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navItems.map(({ href, label, colors, icon: Icon }) => (
            <Link 
              key={href} 
              href={href} 
              scroll={true} 
              className={`font-playfair ${colors} transition-colors duration-300 flex items-center gap-2 group`}
            >
              {Icon && <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />}
              {label}
            </Link>
          ))}
        </nav>
        {/* Secure Login (Desktop) */}
        <SteelButton
          className="ml-4 hidden lg:inline-flex flex-row items-center justify-between"
          onClick={() => setLoginDialogOpen(true)}
        >
          <Lock size={18} className="mr-1" />
          <span>Secure Login</span>
        </SteelButton>
        {/* Mobile Menu Toggle */}
        <Button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden text-white px-6 pb-4 space-y-4 font-medium">
          {navItems.map(({ href, label, colors, icon: Icon }) => (
            <Link 
              key={href} 
              href={href} 
              scroll={true} 
              className={`block ${colors} transition-colors duration-300 flex items-center gap-3 py-2 group`}
              onClick={() => setMenuOpen(false)}
            >
              {Icon && <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />}
              {label}
            </Link>
          ))}
          <SteelButton
            className="w-full justify-center"
            onClick={() => setLoginDialogOpen(true)}
          >
            <Lock size={18} className="mr-1" />
            <span className="text-center">Secure Login</span>
          </SteelButton>
        </div>
      )}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="bg-black text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>Secure Login</DialogTitle>
            <DialogDescription>Enter your credentials to access your account.</DialogDescription>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    </header>
  );
}
