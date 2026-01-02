"use client"

import { Accordion, AccordionItem } from "@nextui-org/react"

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. Express shipping takes 2-3 days, and overnight options are available for most destinations.",
  },
  {
    question: "Is my shipment insured?",
    answer:
      "Basic insurance is included with all shipments. You can purchase additional coverage for high-value items.",
  },
  {
    question: "Can I track my package in real-time?",
    answer:
      "Yes! All shipments come with real-time GPS tracking. You can monitor your package 24/7 through our website or mobile app.",
  },
  {
    question: "What are your delivery options?",
    answer:
      "We offer door-to-door delivery, pickup points, and office delivery. You can choose the option that works best for you.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to 150+ countries worldwide. International rates depend on the destination and weight.",
  },
  {
    question: "How do I handle a delivery issue?",
    answer:
      "You can report an issue directly through your dashboard or contact our 24/7 support team. We typically resolve issues within 48 hours.",
  },
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="mb-12 text-lg text-foreground-600">Find answers to common questions about our services</p>

        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} title={faq.question}>
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
