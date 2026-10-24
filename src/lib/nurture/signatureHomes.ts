import { PROJECT_BROCHURES, SIGNATURE_HOMES } from "@/lib/leads";

// Email copy for the Signature Homes 1 nurture sequence and the cold pitch.
// Bodies use a tiny markup: blank line = new paragraph, "- " = bullet,
// [text](url) = link, {name} = first name, {LINK_NAME} = a link from `links()`.

/** Update as units are reserved — quoted in Email 1. */
export const UNITS_LEFT = "5 of 12";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zithelo.com";

export function links() {
  const meeting = process.env.NURTURE_MEETING_URL ?? `${SITE_URL}/contact?type=investment`;
  return {
    BROCHURE: PROJECT_BROCHURES[SIGNATURE_HOMES]!,
    WHATSAPP: process.env.NURTURE_WHATSAPP_URL ?? "https://wa.me/2349110222323",
    MEETING: meeting,
    VIEWING: process.env.NURTURE_VIEWING_URL ?? meeting,
    PROJECT: `${SITE_URL}/projects/signature-homes`,
  };
}

export interface NurtureEmail {
  /** Days after enrolment the email is due */
  day: number;
  subject: string;
  body: string;
}

const SIGN_OFF = `Gabriel,
Zithelo Real Estate`;

export const SEQUENCE: NurtureEmail[] = [
  {
    day: 0,
    subject: "Here’s your Signature Homes 1 brochure, {name}",
    body: `Hi {name},

Thanks for your interest in Zithelo Signature Homes 1. Your brochure is here: [Download the brochure]({BROCHURE}).

These are 4-bedroom semi-detached duplexes with a BQ, in a secure gated estate off Toyin Street, Ikeja. We have ${UNITS_LEFT} units left.

So I can point you to the right information, could you reply with one line: are you buying to live in it, or as an investment?

You can also reach me directly on [WhatsApp]({WHATSAPP}).

${SIGN_OFF}`,
  },
  {
    day: 1,
    subject: "What’s inside a Signature Homes duplex",
    body: `Hi {name},

Here’s what every unit includes:

- 4 bedrooms, each with a walk-in closet
- Boys’ Quarters (BQ)
- Fully fitted modern kitchen
- Private balcony
- Fibre-ready wiring for fast internet from day one
- 24/7 power supply
- Gated estate with CCTV and ample on-site parking

Would you like a private viewing? Reply with a day that works and I’ll arrange it.

You can also [schedule a meeting here]({MEETING}) if you’d prefer.

${SIGN_OFF}`,
  },
  {
    day: 3,
    subject: "10 minutes from the airport, minutes from Ikeja City Mall",
    body: `Hi {name},

Location is the one thing you can’t change after you buy, so I want to show you what Signature Homes 1 puts within easy reach.

The estate is off Toyin Street, Ikeja, and from your front door it’s about:

- 5 minutes to Allen Avenue
- 10 minutes to Ikeja City Mall
- 12 minutes to M.M. International Airport

Marriott Hotel and the Lagos State Secretariat are also close by.

Whether you’re living here or renting it out, that means a short commute, easy shopping, and fast access to the airport for travel or for family and guests flying in.

If you’d like to see the area for yourself, I can book you a site visit this week: [book a site visit]({VIEWING}). Or reply with a day that suits you and I’ll arrange it.

${SIGN_OFF}`,
  },
  {
    day: 5,
    subject: "Let’s talk through pricing and payment options",
    body: `Hi {name},

You’ve had a chance to look at Signature Homes 1, so I’d like to help with the next question: what it would take to own one.

Pricing depends on the unit and the payment structure that suits you. On a short call, I can cover:

- Pricing for the units still available
- Flexible payment options
- The completion timeline
- Which unit best fits what you’re looking for

It takes about 15 minutes. You can [schedule a time that works for you]({MEETING}).

Or reply with a time that suits you, or message me on [WhatsApp]({WHATSAPP}) and I’ll call you.

${SIGN_OFF}`,
  },
  {
    day: 8,
    subject: "{name}, come and see Signature Homes 1 for yourself",
    body: `Hi {name},

Photos and brochures only go so far. The real test of a home is how it feels when you walk through it.

That’s why we welcome private viewings of Signature Homes 1. Here’s what a visit looks like:

- It’s private. You’re not joining a crowd. We schedule your visit around your availability.
- You see the space. The size of the bedrooms and walk-in closets, the BQ, the balconies, and how the layout flows.
- You get answers. Ask me anything about the build, the timeline, or the units still available.

A visit takes about 30 to 45 minutes, and there’s no obligation.

If you’re not in Lagos, we can do a live video walkthrough instead.

Simply reply to this email with your preferred time, or send a message on [WhatsApp]({WHATSAPP}) and I’ll confirm it.

${SIGN_OFF}`,
  },
  {
    day: 12,
    subject: "The best units at Signature Homes 1 go first",
    body: `Hi {name},

Signature Homes 1 is only 12 semi-detached duplexes. That’s part of what makes it special, but it also means choice narrows quickly as reservations have started.

Buyers who decide early usually get the most say in which unit they take. Those who wait tend to take whatever is left.

If Signature Homes 1 is on your shortlist, now is a good time to take the next step:

- Visit privately. See the space and the neighbourhood for yourself, and ask your questions in person.
- Talk it through. In 15 minutes, I can go through pricing, payment options, and the timeline with you.

[Book a meeting by clicking here]({MEETING}).

Or reply to this email, or send a message on [WhatsApp]({WHATSAPP}), and I’ll arrange a time that suits you.

${SIGN_OFF}`,
  },
  {
    day: 18,
    subject: "My last email to you, {name}",
    body: `Hi {name},

This will be my last email about Signature Homes 1. I don’t want to fill your inbox if the timing isn’t right.

If you’re still interested, even if it’s only to ask a few questions, I’d be glad to help. I can arrange a private viewing, answer anything about the home or the area, or talk you through pricing and payment options whenever you’re ready.

You can [schedule a call]({MEETING}), reply to this email, or message me on [WhatsApp]({WHATSAPP}) and I’ll pick it up from there.

And if you’ve decided it’s not for you, no problem at all. Thank you for your time, and I wish you the very best with your search.

${SIGN_OFF}`,
  },
];

/** One-off introduction for leads that didn't come through the website form. */
export const PITCH: Omit<NurtureEmail, "day"> = {
  subject: "Your Next Home in Ikeja: Discover Zithelo Signature Homes",
  body: `Imagine owning a spacious, contemporary home in one of Ikeja's most strategic locations.

Zithelo Signature Homes 1 offers 4-bedroom semi-detached duplexes with boys' quarters, designed for modern family living and discerning property buyers.

Located off Toyin Street, Ikeja, the development combines premium finishes, walk-in closets, a fully fitted kitchen, private balconies, fibre-ready infrastructure and a secure gated environment with CCTV surveillance.

With convenient access to Marriott Hotel, Ikeja City Mall, the Lagos State Secretariat and Murtala Muhammed International Airport, you'll enjoy a well-connected address without compromising on comfort.

Whether you're looking for a family home, planning your return to Nigeria or exploring property ownership in Lagos, Signature Homes 1 is worth considering.

Contact our team to confirm current availability, pricing and payment options.

Ready to take the next step?

[Enquire today]({PROJECT}) to receive property details or arrange a private viewing.

Call/WhatsApp: [+234 9110 222 323]({WHATSAPP})

Zithelo Real Estate — Building City-Grade Assets for Africa’s Next Urban Chapter.`,
};

// ─── Rendering ───────────────────────────────────────────────────────────────

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fill(template: string, firstName: string) {
  const l = links() as Record<string, string>;
  return template
    .replace(/\{name\}/g, firstName)
    .replace(/\{([A-Z]+)\}/g, (m, key: string) => l[key] ?? m);
}

function inlineHtml(text: string) {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label, url) => `<a href="${url}" style="color:#a8872f;font-weight:600;">${label}</a>`
  );
}

export function renderEmail(
  email: Omit<NurtureEmail, "day">,
  fullName: string,
  unsubscribeUrl?: string
) {
  const firstName = fullName.trim().split(/\s+/)[0] || "there";
  const subject = fill(email.subject, firstName);
  const body = fill(email.body, firstName);
  const blocks = body.split(/\n\s*\n/);

  const html = blocks
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((l) => l.startsWith("- "))) {
        const items = lines
          .map((l) => `<li style="margin:0 0 6px;">${inlineHtml(l.slice(2))}</li>`)
          .join("");
        return `<ul style="margin:0 0 16px;padding-left:20px;">${items}</ul>`;
      }
      return `<p style="margin:0 0 16px;">${lines.map(inlineHtml).join("<br>")}</p>`;
    })
    .join("");

  const footer = unsubscribeUrl
    ? `<p style="margin:24px 0 0;font-size:11px;color:#999;">Don’t want these emails? <a href="${unsubscribeUrl}" style="color:#999;">Unsubscribe</a>.</p>`
    : "";

  const text =
    body.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)") +
    (unsubscribeUrl ? `\n\nUnsubscribe: ${unsubscribeUrl}` : "");

  return {
    subject,
    text,
    html: `<!DOCTYPE html><html><body style="margin:0;padding:24px 16px;background:#ffffff;">
<div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;">${html}${footer}</div>
</body></html>`,
  };
}
