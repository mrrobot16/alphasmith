import { site } from "./site";

/** Text still to be confirmed by the owner. Kept visibly bracketed until real values exist. */
export const legalPlaceholders = {
  address: "[Street address is missing]",
  effectiveDate: "2026",
};

/**
 * Block types:
 *  - p: paragraph. Supports [label](/path) links.
 *  - ul / ol: lists.
 *  - h: sub-heading inside a section.
 *  - todo: a visible bracketed note for information the owner still has to supply.
 *  - contact: the business contact card.
 */
export type LegalBlock =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { h: string }
  | { todo: string }
  | { contact: true };

export type LegalSection = { title: string; blocks: LegalBlock[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[]; closing: string };

const name = site.name;

export const terms: LegalDoc = {
  title: "Terms and Conditions",
  intro: `Welcome to ${name} (“we,” “us,” or “our”). These Terms and Conditions (“Terms”) govern your use of our website, services, and communications. By accessing our website or using our services, you agree to be bound by these Terms. If you do not agree, please do not use our services.`,
  sections: [
    {
      title: "General services",
      blocks: [
        {
          p: "We provide locksmith, garage door, automatic gate, fence and access control services to customers in the Portland, Oregon area. Our services are subject to availability and may vary based on location, time, and other factors.",
        },
      ],
    },
    /* Hidden until the owner confirms Alpha sends text messages. If it does, uncomment this section; if not, delete it.
    {
      title: "Consent for SMS communication",
      blocks: [
        { todo: "[SMS is unconfirmed: confirm that Alpha sends text messages. If it does not, remove this section]" },
        {
          p: "By providing your phone number and consenting to receive SMS communications, you agree to the following terms regarding text message communications.",
        },
        { h: "Information usage" },
        {
          ul: [
            "Information obtained as part of the SMS consent process will only be used to provide relevant updates and services.",
            "We do not share your information with third parties for marketing purposes.",
          ],
        },
        { h: "Types of SMS communications" },
        { p: `If you consent to receive text messages from ${name}, you may receive the following types of messages.` },
        { p: "Customers and guests:" },
        {
          ul: [
            "Updates about your service requests, including scheduling, technician arrival times, order confirmations, or delivery updates.",
            "Follow-ups regarding completed services or feedback requests.",
          ],
        },
        { p: "Job applicants:" },
        {
          ul: [
            "Updates regarding your application status.",
            "Notifications about onboarding materials or employment-related information.",
          ],
        },
        { h: "Standard messaging disclosures" },
        {
          ul: [
            "Message frequency: Message frequency may vary depending on your interactions with our services.",
            "Message and data rates: Standard message and data rates may apply. Please consult your mobile service provider for details on applicable charges.",
            "Opt-out: You can opt out of SMS communications at any time by texting “STOP.” After opting out, you will no longer receive SMS messages from us unless you re-subscribe.",
          ],
        },
      ],
    },
    */
    {
      title: "Website usage",
      blocks: [
        {
          p: "The content on our website, including text, images, and services, is for informational purposes only. Unauthorized use, reproduction, or redistribution of any content is strictly prohibited.",
        },
      ],
    },
    {
      title: "Limitation of liability",
      blocks: [
        { p: `${name} will not be held liable for any damages resulting from:` },
        {
          ul: [
            "The use of our services.",
            "Delays, errors, or interruptions in service due to circumstances beyond our control.",
            "Any issues arising from third-party vendors or subcontractors.",
          ],
        },
      ],
    },
    {
      title: "Cancellations and refunds",
      blocks: [
        {
          p: "Cancellation policies for scheduled services may vary. Please contact us for assistance regarding cancellations, rescheduling, or refunds.",
        },
      ],
    },
    {
      title: "Privacy policy",
      blocks: [
        {
          p: "Please refer to our [Privacy Policy](/privacy-policy) for details on how we collect, use, and protect your personal information.",
        },
      ],
    },
    {
      title: "Changes to these terms",
      blocks: [
        {
          p: "We reserve the right to update or modify these Terms at any time. Any changes will be posted on this page, and your continued use of our services constitutes acceptance of the updated Terms.",
        },
      ],
    },
  ],
  closing: "By using our services, you confirm that you have read, understood, and agreed to these Terms and Conditions.",
};

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  intro: `${name} is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect personal information when you visit our website or use our services. By accessing or using our website, you agree to this policy.`,
  sections: [
    {
      title: "Information we collect",
      blocks: [
        { p: "We may collect the following types of information:" },
        {
          ul: [
            "Personal information: your name, address, phone number and email when you fill out forms on our website or contact us for services.",
            "Usage information: how you interact with our website, such as IP address, browser type, and device data, used to improve the experience.",
          ],
        },
      ],
    },
    {
      title: "How we use your information",
      blocks: [
        { p: "We use your information to:" },
        {
          ul: [
            "Provide and improve our locksmith, garage door, gate and fence services.",
            "Process transactions and manage your account.",
            "Respond to your inquiries and customer service requests.",
            "Send promotional or informational emails if you have opted in.",
          ],
        },
      ],
    },
    {
      title: "Data protection",
      blocks: [
        {
          p: "We take data protection seriously and use security measures to protect your information against unauthorized access, alteration, or disclosure. Our website uses industry-standard encryption, firewalls, and secure servers to protect your data.",
        },
      ],
    },
    {
      title: "Your rights",
      blocks: [
        { p: "You have the following rights regarding your data:" },
        {
          ul: [
            "Access: you can request access to the personal data we hold about you.",
            "Correction: you can request correction of any inaccuracies in your data.",
            "Deletion: you can request deletion of your data where applicable by law.",
            "Restriction: you can ask us to limit the processing of your personal data.",
            "Data portability: you can request a copy of your personal data in a structured format.",
          ],
        },
      ],
    },
    {
      title: "Opt-in and opt-out",
      blocks: [
        { p: "You may choose to opt in or opt out of receiving marketing communications from us:" },
        {
          ul: [
            "Opt-in: you will only receive marketing emails if you explicitly opt in by subscribing on our website or requesting information.",
            "Opt-out: you can unsubscribe from marketing emails at any time by clicking the “Unsubscribe” link at the bottom of our emails, replying “STOP” to texts, or contacting us directly.",
          ],
        },
      ],
    },
    {
      title: "Sharing your information",
      blocks: [
        {
          p: "We may share your information with third-party service providers who assist us with our business operations. We do not sell or rent your personal information to third parties. We may disclose information as required by law or to protect our rights, property, or safety.",
        },
      ],
    },
    {
      title: "Cookies and tracking technologies",
      blocks: [
        {
          p: "Our website may use cookies and similar tracking technologies to enhance your experience, analyze trends, and administer the site. You can control the use of cookies at the individual browser level.",
        },
      ],
    },
    {
      title: "Children’s privacy",
      blocks: [
        {
          p: "Our services are not directed to individuals under the age of 13. We do not knowingly collect or solicit personal information from children under 13.",
        },
      ],
    },
    {
      title: "Changes to this privacy policy",
      blocks: [
        {
          p: "We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of any significant changes by posting the new Privacy Policy on our website.",
        },
      ],
    },
  ],
  closing: "By using our website, you acknowledge that you understand and agree to this Privacy Policy.",
};
