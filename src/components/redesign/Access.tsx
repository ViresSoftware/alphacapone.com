'use client';

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SteelButton } from "@/components/SteelButton";

export default function AccessSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    entityRole: "",
    email: "",
    areaOfInterest: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.name || !formData.email || !formData.areaOfInterest) {
      alert("Please fill in all required fields");
      return;
    }
    setLoading(true);
    // Split name into first and last name
    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    // Prepare data for Vires Submissions API
    const formId = process.env.NEXT_PUBLIC_VIRES_FORM_ID || '1';
    const submissionData = {
      form_id: parseInt(formId),
      first_name: firstName,
      last_name: lastName,
      email_address: formData.email,
      entity_role: formData.entityRole, // Custom field - saved to vires_submission_meta
      area_of_interest: formData.areaOfInterest, // Custom field - saved to vires_submission_meta
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
        // Reset form
        setFormData({
          name: "",
          entityRole: "",
          email: "",
          areaOfInterest: "",
        });
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
    <section className="relative py-16 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Content wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="mb-6 text-center md:text-left">
            <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
              Access
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
              Confidential, Vetted Access Only
            </h2>
            <div className="flex-1 text-[0.95rem] text-gray-300 flex items-start">
              <p className="leading-relaxed">
                We do not offer retail services or public trading. Every engagement
                is vetted and led by professionals. If you represent a qualified 
                counterparty and wish to discuss a mandate in digital assets,
                energy, or luxury assets, request a secure introduction.
              </p>
            </div>
          </div>
        </div>
        {/* Form */}
        {submitted ? (
          <div className="w-full flex flex-col gap-5 bg-green-900/20 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-green-700 shadow-md">
            <div className="text-center py-4">
              <p className="text-green-400 font-medium mb-2">Request Submitted Successfully</p>
              <p className="text-gray-300 text-sm">
                Your access request has been received. We will review your submission and respond accordingly.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700 shadow-md">
            <div className="flex flex-col space-y-2">
              <Label className="mb-1 font-medium text-gray-200">Name *</Label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className="border border-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="mb-1 font-medium text-gray-200">Entity / Role</Label>
              <input
                type="text"
                name="entityRole"
                value={formData.entityRole}
                onChange={(e) => setFormData({ ...formData, entityRole: e.target.value })}
                placeholder="Family office, principal, etc."
                className="border border-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="mb-1 font-medium text-gray-200">Email *</Label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="border border-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-1 font-medium text-gray-200">Area of Interest *</Label>
              <Select
                value={formData.areaOfInterest}
                onValueChange={(value) => setFormData({ ...formData, areaOfInterest: value })}
                required
              >
                <SelectTrigger className="border border-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Digital Assets">Digital Assets</SelectItem>
                  <SelectItem value="Energy & Petroleum">Energy & Petroleum</SelectItem>
                  <SelectItem value="Fine Art & Luxury">Fine Art & Luxury</SelectItem>
                  <SelectItem value="Lux Market Application">Lux Market Application</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SteelButton
              type="submit"
              className="mt-4 w-full md:w-auto"
            >
              {loading ? "Submitting..." : "Request Introduction"}
            </SteelButton>
          </form>
        )}
      </div>
    </section>
  );
}
