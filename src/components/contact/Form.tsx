'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Lock } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [investmentType, setInvestmentType] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!investmentType) {
      alert("Please select an investment type");
      return;
    }
    setLoading(true);
    const form = e.currentTarget;
    // Get form field values
    const firstName = (form.elements.namedItem("first-name") as HTMLInputElement).value;
    const lastName = (form.elements.namedItem("last-name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    // Prepare data for Vires Submissions API
    // form_id should match the form ID created in WordPress admin
    const formId = process.env.NEXT_PUBLIC_VIRES_FORM_ID || '1'; // Default to form ID 1
    const submissionData = {
      form_id: parseInt(formId),
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      message: message,
      investment_type: investmentType, // Custom field - will be saved to vires_submission_meta
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/vires/v1/submissions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      const result = await res.json();
      if (result.success === true) {
        setSubmitted(true);
      } else {
        alert("❌ Submission failed: " + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-10 lg:py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <h2 className="text-3xl font-playfair">Contact Us</h2>
        {submitted ? (
          <div className="flex items-start bg-green-900 text-green-100 border border-green-600 px-4 py-3 rounded-lg space-x-3">
            <ShieldCheck className="h-5 w-5 mr-2"/>
            <p className="text-sm">Your message has been received. We respond only to verified parties.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" name="first-name" type="text" required placeholder="First Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" name="last-name" type="text" required placeholder="Last Name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investment-type">Investment Interest</Label>
              <Select value={investmentType} onValueChange={setInvestmentType}>
                <SelectTrigger id="investment-type" name="investment-type" className="w-full">
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                  <SelectItem value="Cryptocurrencies">Cryptocurrencies</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" required placeholder="Your confidential inquiry..." className="h-30" />
            </div>
            <Button
              variant="outline"
              type="submit"
              size="lg"
              className="w-full bg-white text-black"
              disabled={loading}
            >
              <Lock size={18} className="mr-1" /> {loading ? "Sending..." : "Send Secure Message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
