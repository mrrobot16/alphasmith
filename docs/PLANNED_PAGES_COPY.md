# Planned Pages: Copy

These seven pages are planned in the client's copy doc (`SEO_COPY_V1.md`) but don't exist on the site yet. They're a separate scope from the copy already put into the existing service pages.

The copy below is taken word for word from `SEO_COPY_V1.md`, keeping the doc's numbering.

## Pages

| # | Page | Already named on the site (as plain text, no link) |
|---|---|---|
| 2 | Emergency Lockout Service | Locksmith page, related pages: "Emergency Lockouts" |
| 3 | Lock Rekeying | Locksmith page, related pages: "Lock Rekeying" |
| 4 | Lock Repair and Replacement | Locksmith page, related pages: "Lock Repair & Replacement" |
| 5 | Replacement Car Keys | Locksmith page, related pages: "Replacement Car Keys" |
| 7 | Commercial Overhead and Rolling Doors | Garage doors page, related pages: "Commercial overhead doors" |
| 8 | Storefront and Commercial Door Repair | Access control page, related pages: "Storefront & Commercial Doors" |
| 10 | Commercial Gate Maintenance | Automatic gates page, related pages: "Commercial Gate Maintenance" |

When a page goes live, add its `slug` to those related entries in `src/lib/services.ts` so they become links.

## Notes from the existing pages

- **SEO titles:** the doc's titles end in "| Alpha". The existing pages dropped that suffix from every title tag.
- **Buttons:** the "Button" lines were skipped on the existing pages; only the text was put in.
- **24/7 wording:** page 2's title and H1 say "24/7". The site hides 24/7 claims from 10pm to 6am (`src/lib/hours.ts`), but titles and H1s aren't covered by that.
- **Arrival times:** page 2 promises "an estimated arrival time" when the customer calls, while the Locksmith page says "We'll arrive between 20-35 minutes". The client hasn't settled which one is right.

---

## Locksmith

### 2. Emergency Lockout Service

- **SEO title:** 24/7 Emergency Lockout Services in Portland, OR | Alpha
- **Meta description:** Locked out of your car, home, or business in Portland? Call 503-505-8560 for 24/7 mobile lockout assistance
- **H1:** 24/7 Car, Home, and Business Lockout Service in Portland

Keys locked inside your car? Unable to get into your home or open your business? Alpha Locksmith & Garage answers emergency calls 24/7. Tell us where you are and what you’re locked out of so we can confirm technician availability and give you an estimated arrival time.

#### Tell us what happened

A key left inside, a lost key, and a broken key can each call for a different service. For a vehicle lockout, have the year, make, and model ready. For a home or business, tell us which door is affected and whether the lock was already sticking or damaged.

#### Help us find you

Give us the street address or nearest intersection. If you’re in a parking garage, apartment complex, or shopping center, include the level, building number, or storefront name. Have your ID and any proof of authorized access available. We’ll explain the options and quote the work before starting.

> **Related page:** Replacement Car Keys
>
> **Button (near the top of the page):** Call Now for Lockout Help — 503-505-8560

---

### 3. Lock Rekeying

- **SEO title:** Lock Rekeying in Portland, OR | Home & Business | Alpha
- **Meta description:** Rekey your home, rental, or business locks in Portland. Keep compatible hardware and change which keys open your doors.
- **H1:** Lock Rekeying for Homes and Businesses in Portland

Rekeying lets you keep compatible locks and change which keys open them. It’s a practical option after moving into a home, taking over a commercial space, or changing who should have access to a rental or business.

#### Rekey after a move, lost key, or tenant turnover

If you don’t know who still has a copy of your keys, we can check whether your existing locks can be rekeyed. Property managers can schedule service between tenants, and businesses can specify which entrances need new keys after an employee leaves or a key goes missing.

#### Can one key open multiple doors?

If the locks are compatible, we may be able to set up several doors to work with one key. Include side entrances, back doors, and detached garages when you make your list. Tell us which doors should share a key and which should stay separate.

#### What affects the cost?

The quote depends on how many locks you need rekeyed, the hardware, and how many new keys you want. If a lock is worn or incompatible, we’ll explain your options before you approve the work.

> **Related page:** Lock Repair & Replacement
>
> **Button:** Request a Rekeying Quote

---

### 4. Lock Repair and Replacement

- **SEO title:** Lock Repair & Replacement in Portland, OR | Alpha
- **Meta description:** Get help with sticking locks, damaged deadbolts, and doors that won’t latch. Alpha repairs and replaces locks in the Portland metro area.
- **H1:** Lock Repair and Replacement in Portland, OR

A key that takes extra force to turn, a deadbolt that binds, or a latch that won’t catch can make a door hard to use or secure. We inspect the lock, door, and frame together to find where the problem starts.

#### Why a lock may jam when the door closes

If the deadbolt turns freely while the door is open but binds when it’s closed, the bolt may be catching against the strike in the frame. A shifted door, loose hinge, worn lock cylinder, or damaged latch can cause similar symptoms. We’ll check the hardware before recommending the repair.

#### When to replace a lock

Replacement may make sense when the lock is damaged, keeps jamming, or no longer meets your needs. For a commercial entrance, we also consider how the door is used during business hours and how staff need to enter after hours.

> **Related pages:** Lock Rekeying · Storefront & Commercial Doors
>
> **Button:** Request Lock Repair or Replacement

---

### 5. Replacement Car Keys

- **SEO title:** Mobile Car Key Replacement in Portland, OR | Alpha
- **Meta description:** Lost your car key or need a spare in Portland? Call Alpha with your vehicle’s year, make, and model to confirm mobile replacement options.
- **H1:** Mobile Car Key Replacement in Portland, OR

If you’ve lost your only car key, damaged a key, or want a spare, Alpha Locksmith & Garage can help with supported vehicles. We’ll confirm whether your replacement needs to be cut, programmed, or both before scheduling.

#### Lost keys, spare keys, and damaged keys

Tell us whether you still have a working key. Making a spare and replacing a key when all copies are missing can require different equipment. If the remote stopped responding but the physical key still works, let us know so we can identify the service you need.

#### What to have ready

Have your vehicle’s year, make, and model handy. Tell us whether it uses a standard ignition or push-button start. We’ll confirm what we can provide for your vehicle and what proof of ownership to have available.

> **Related page:** Emergency Lockouts
>
> **Button:** Call 503-505-8560 to Check Key Availability

---

## Garage and Overhead Doors

### 7. Commercial Overhead and Rolling Doors

- **SEO title:** Commercial Overhead & Rolling Door Repair in Portland | Alpha
- **Meta description:** Commercial overhead and rolling door repair for Portland warehouses, retail stores, and loading areas. Service for manual and motorized doors.
- **H1:** Commercial Overhead and Rolling Door Repair in Portland

An overhead door that won’t open can interrupt deliveries. One that won’t close can leave a facility unsecured. We service commercial overhead and rolling doors at warehouses, retail locations, receiving areas, and other facilities throughout the Portland metro area.

#### Service for manual and motorized doors

We assess doors that bind, stop partway, or stay stuck open or closed. We inspect the door hardware and, on motorized doors, the operator to find what’s preventing normal operation.

#### What to include in your work order

Send the site address, door number or location, and whether the opening is secure. Photos of the door and its manufacturer or operator label help us identify the equipment. Include delivery windows, site access instructions, and the name of the person who can approve the work.

> **Related page:** Storefront & Commercial Doors
>
> **Button:** Request Commercial Overhead Door Service

---

### 8. Storefront and Commercial Door Repair

- **SEO title:** Commercial Storefront Door Repair in Portland, OR | Alpha
- **Meta description:** Portland storefront door repair for closers, hinges, locks, and panic bars. Get help with commercial doors that drag, slam, or won’t latch.
- **H1:** Storefront and Commercial Door Repair in Portland, OR

A storefront door that drags, slams, or fails to latch affects customers and staff all day. Alpha Locksmith & Garage repairs commercial entrances and back doors for retailers, offices, and property managers in the Portland metro area.

#### Door closers, hinges, locks, and panic bars

We work on closers, hinges, pivots, locks, latches, and panic bars, also called exit devices. We check how the door swings, closes, and secures before recommending an adjustment, repair, or replacement. For example, when a door closes most of the way but won’t latch, we check how the latch lines up with the frame.

#### Service for property managers and facility teams

Identify the opening when you submit a work order. Tell us whether it serves customers, employees, deliveries, or exit traffic and whether the door can close, latch, and lock. If the opening also needs glass work, include photos so we can confirm the scope.

> **Related pages:** Commercial Overhead & Rolling Doors · Access Control
>
> **Button:** Request Storefront Door Repair

---

## Automatic Gates

### 10. Commercial Gate Maintenance

- **SEO title:** Quarterly Commercial Gate Maintenance in Portland | Alpha
- **Meta description:** Schedule quarterly preventive maintenance for manual and automatic gates in Portland. Alpha checks operation, lubricates parts, and makes routine adjustments.
- **H1:** Preventive Maintenance for Commercial Gates in Portland

Gates at apartment communities, retail properties, and managed facilities may open and close throughout the day. Quarterly service gives your team a regular opportunity to address wear and recurring problems before they interrupt access.

#### What a maintenance visit includes

We check how the gate opens and closes, lubricate applicable parts, and make routine adjustments. Tell us if staff have noticed unusual sounds, slower movement, or a gate that sometimes fails to close. If we find that a gate needs a repair or replacement part, we explain what we found and quote the work separately.

#### Get a quote for your property

Send the property address, the number of gates, and whether each one operates manually or automatically. Let us know how often the gates are used and whether any have recurring issues.

> **Related page:** Automatic Gate Installation & Repair
>
> **Button:** Request a Quarterly Maintenance Quote
