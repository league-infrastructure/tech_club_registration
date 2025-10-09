# League of Tech Mentors - Use Cases Document

## Overview
This document describes the key use cases for the League of Tech Mentors platform, organized by user role and functional area.



## Stakeholders

### 1. System Administrator
**Role:** System-level administrator with full access across all metros, venues, and events.

**Responsibilities:**
- Manage metro configurations and settings
- Oversee all venues and events across the organization
- Manage user accounts and permissions
- Configure system-wide settings and integrations
- Generate reports across all metros
- Handle escalated issues and support requests

**Key Needs:**
- Comprehensive dashboard with organization-wide metrics
- Ability to act on behalf of any metro or venue ( impersonation )
- Audit logs and system monitoring tools


### 2. Metro Administrator
**Role:** Regional administrator responsible for a specific metropolitan area.

**Responsibilities:**
- Manage venues within their metro
- Coordinate events across metro venues
- Manage metro-specific marketing campaigns and flyers
- Review and approve venue partners within their metro
- Monitor registration trends and event performance in their region
- Coordinate with venue partners and instructors

**Key Needs:**
- Metro-scoped dashboard and analytics
- Venue and event management tools
- Marketing and flyer creation/tracking
- Instructor assignment and coordination tools
- Partner relationship management



### 3. Partners

Partners are external organizations or entities that collaborate with the League of Tech Mentors. There are three types of partners:

#### 3.1. Funding Partners
**Role:** Organizations that provide financial support for events, programs, or the overall operation.

**Responsibilities:**
- Provide funding or sponsorship for events/programs
- May have specific requirements for fund usage or reporting
- May request recognition/branding at sponsored events

**Key Needs:**
- View impact reports for their sponsored events
- Track how their funding is being utilized
- Access to metrics and outcomes
- Recognition and branding options


#### 3.2. Education Providers
**Role:** Organizations that provide curriculum, teaching materials, or educational content.

**Responsibilities:**
- Provide educational resources and curriculum
- May offer training for instructors
- May collaborate on program development
- Ensure quality and relevance of educational content

**Key Needs:**
- Track usage of their materials/curriculum
- Feedback from instructors and students
- Collaboration tools for content development
- Quality metrics and outcomes

#### 3.3. Venue Partners
**Role:** Organizations that provide physical locations for hosting events (e.g., libraries, community centers, schools).

**Responsibilities:**
- Provide venue space and facilities
- Communicate venue details and logistics (address, parking, entry instructions)
- Review and confirm event schedules at their venue
- Communicate venue-specific requirements or changes
- May assist with local promotion of events

**Key Needs:**
- View events scheduled at their venue
- Update venue information and logistics
- Communicate with metro administrators
- Access to registration counts for planning purposes



### 4. Paid Instructor
**Role:** Compensated instructor who teaches at events after completing evaluation process.

**Responsibilities:**
- Teach assigned classes/events
- Prepare lesson materials and activities
- Manage classroom activities and student engagement
- Provide feedback on student progress (if applicable)
- Maintain professional standards and teaching quality

**Key Needs:**
- View assigned events and rosters
- Access to teaching materials and resources
- Communication with students/parents
- Track teaching hours and compensation

**Prerequisites:**
- Must complete volunteer teaching first
- Must receive positive instructor evaluation
- Must be formally hired through employment process



### 5. Volunteer Instructor
**Role:** Unpaid instructor who teaches at events, may be working toward paid position.

**Responsibilities:**
- Teach assigned classes/events
- Prepare lesson materials and activities
- Manage classroom activities and student engagement
- Learn and develop teaching skills
- May be evaluated for potential paid instructor position

**Key Needs:**
- View assigned events and rosters
- Access to teaching materials and resources
- Communication with students/parents
- Feedback and guidance for improvement

**Path to Paid Position:**
1. Complete volunteer teaching assignment(s)
2. Receive instructor evaluation from coordinator/administrator
3. If evaluation is positive, may be offered paid instructor position



### 6. Registrant (Parent/Guardian)
**Role:** Person registering student(s) for events, typically a parent or legal guardian.

**Responsibilities:**
- Discover and browse available events
- Register student(s) for events
- Manage RSVPs (confirm attendance or cancel)
- Provide emergency contact information
- Communicate with event organizers if needed

**Key Needs:**
- Easy event discovery and filtering
- Simple registration process (with or without account)
- Manage multiple students/children
- View upcoming and past registrations
- Receive event reminders and updates
- RSVP management (confirm/cancel attendance)

**Account Options:**
- Can register without creating an account (guest registration)
- Can optionally create account for faster future registrations and registration management



## 1. EVENT DISCOVERY & REGISTRATION

### UC-1.1: Discover Event via Social Media Link

**Actor:** Parent/Guardian (Registrant)

**Precondition:** A Flyer (distribution) has been created with associated Events

**Flow:**
1. User sees social media post with event link
2. User clicks link containing flyer reference (e.g., `lotm.org/f/summer-coding-2025`)
3. System looks up Flyer by reference slug
4. **IF** Flyer has only ONE associated Event:
   - System redirects directly to Event detail page
5. **ELSE IF** Flyer has MULTIPLE associated Events:
   - System displays Flyer landing page with:
     - Flyer styling/header image (if configured)
     - List of all associated Events
     - User clicks on specific Event
     - System displays Event detail page
6. User views Event details (date, time, venue, description, capacity)

**Postcondition:** User is viewing Event detail page ready to register

**Variants:**

- **V1.1a:** Flyer link contains UTM parameters for tracking (utm_source, utm_campaign)
- **V1.1b:** Link goes to a specific Event directly (e.g., `lotm.org/e/python-workshop-123`)
- **V1.1c:** User discovers event through other channels (venue website, Meetup, library calendar)



### UC-1.2: Register for Event (Primary Flow - Detailed)

**Actor:** Parent/Guardian (Registrant)

**Precondition:** User is viewing Event detail page (arrived via UC-1.1 or direct link)

**Context:** UTM parameters from original link (utm_source, utm_campaign) are preserved throughout flow

**Step 1: View Event Detail Page**

User sees:
- Event title, description, date/time
- Venue name, address
- Parking & building entry instructions (from Venue record)
- Available slots remaining
- **"Register Now" button** (or "Join Waitlist" if at capacity, or "No registration needed" if open event)

**Step 2: Begin Registration**

User clicks "Register" → System displays registration form

**Step 3: Complete Registration Form**

**Section A: Your Information (Registrant)**

- First Name* (required)
- Last Name* (required)
- Email* (required)
- Mobile Phone* (required - for emergency contact)

**Section B: Students Attending**

For each child:
- First Name* (required)
- Age (optional but helpful for instructor preparation)
- [+ Add Another Child] button to register multiple students

**Section C: Create Account (Optional)**

- Checkbox: "Save my information for faster registration next time"
- Password field (only appears if checkbox selected)
- Explanation text: "You can register without an account, but an account lets you manage your registrations and speeds up future sign-ups"

**Step 4: Submit Registration**

When user submits, system creates:

1. **Person record for Registrant** (if email doesn't exist in system):
   - first_name, last_name, email, phone
   - is_adult = true
   - login_enabled = true (if account created) OR false (if not)
   - metro = [derived from Event's Metro]
   - created_at = timestamp

2. **Person record(s) for Student(s)** (one per child):
   - first_name (only - last name not required for students)
   - date_of_birth OR age (if provided)
   - is_adult = false
   - metro = [same as parent]
   - created_at = timestamp

3. **Registration record**:
   - registrant → Person (parent/guardian)
   - event → Event
   - registration_source = "web_form"
   - utm_source = [captured from URL parameter, e.g., "facebook"]
   - utm_campaign = [captured from URL parameter, e.g., "june2025"]
   - created_at = timestamp

4. **RSVP record(s)** - one per student:
   - event → Event
   - attendee → Person (student)
   - guardian → Person (registrant/parent)
   - role = "student"
   - relationship = "child"
   - attended = null (will be set during check-in at event)
   - notes = blank

**Step 5: Send Confirmation**

System immediately sends confirmation email to registrant containing:
- Event details (title, date, time, description)
- Venue name and address
- Parking instructions (from Venue.parking_instructions)
- Building entry instructions (from Venue.building_entry_instructions)
- What to bring (from Event description)
- List of registered children
- **IF account was created:**
  - Login credentials (email and temporary password)
  - Link to account management portal
- **IF no account created:**
  - Just confirmation details
  - Gentle invitation to create account for future convenience

**Step 6: Update Event Availability**

- System decrements Event.available_slots by number of students registered
- If slots reach zero, future registrations become waitlist

**Postcondition:** 
- Registration confirmed
- Slots reserved (or waitlist position secured)
- Confirmation email sent
- Marketing attribution captured (utm_source, utm_campaign)
- Parent can receive future communications about upcoming events



**Important Variants:**

**V1.2a: Returning User with Account**
- User logs in BEFORE clicking Register button
- Registration form pre-fills with saved information:
  - Name, email, phone from Person record
  - Previously registered children appear as checkboxes
  - Can add new children in addition to existing
- Submit process creates Registration + new RSVPs as normal
- Reduces friction for repeat attendees

**V1.2b: Event Requires Account Creation**
- When Event.registration_type = "account_required"
- Section C (Create Account) becomes mandatory, not optional
- Password field is required
- User cannot proceed without creating account
- Used for: special events needing better communication, multi-week programs, events with prerequisites

**V1.2c: Event Doesn't Require Registration**
- When Event.registration_type = "open" or "walk_in_only"
- Event detail page displays: "No registration needed - just show up!"
- No "Register" button appears
- Attendance tracked via walk-in counter at event (Event.walk_in_count)
- Used for: festivals, open houses, informal drop-in sessions at libraries

**V1.2d: Event at Capacity**
- When Event.available_slots = 0
- "Register" button changes to "Join Waitlist"
- Registration process identical, but RSVP records marked as waitlist status
- If cancellation occurs, system can auto-promote first waitlist person
- Coordinator receives notification of high-demand events

**V1.2e: Multiple Children from Same Family**
- Single Registration record for the parent/guardian
- Multiple RSVP records created (one per child)
- All RSVPs linked to same guardian Person record
- Each child can be independently checked in at event
- Confirmation email lists all registered children

**V1.2f: User Returns to Add More Children**
- Parent logs in or uses email link
- Accesses existing Registration
- Adds additional children (creates new RSVP records)
- Updated confirmation email sent

**V1.2g: Festival/Large Open Event**
- No registration capacity limits (Event.capacity = very high or null)
- Registration might be optional or not exist
- Primary purpose: capture interest for follow-up marketing
- Actual attendance tracked via walk-in counter
- Used for: community festivals, library open houses, school STEM nights



**Design Rationale: Why Minimal Student Information?**

The registration form intentionally keeps student data minimal (first name + optional age) because:

1. **Privacy Protection** - Less personal data = less risk exposure
2. **Reduced Friction** - Faster registration = higher conversion rates
3. **Sufficient for Purpose** - Instructors only need first names to address students during events
4. **Family-Focused Model** - Parent is primary contact; children are attendees
5. **Free Events** - For free community programming, speed matters more than detailed profiles
6. **Future Flexibility** - Can collect more data over time through post-event surveys if needed

This design optimizes for conversion on free community events where the goal is maximizing participation, not building detailed student profiles.



### UC-1.3: Register Without Creating Account

**Actor:** Parent/Guardian (Registrant)

**Flow:**
1. Same as UC-1.2 steps 1-3
2. User skips account creation section
3. System creates records as in UC-1.2 but with `login_enabled = false`
4. Confirmation email sent with event details only (no login credentials)

**Postcondition:** Registration complete but no account access for future

**Business Rule:** System tracks reliability by comparing registrations to actual attendance, even for users without accounts



### UC-1.4: Check In at Event
**Actor:** Event Staff/Volunteer
**Precondition:** Event is happening, registrations exist
**Flow:**
1. Staff opens check-in interface for Event
2. System displays list of registered attendees (RSVPs)
3. For each arriving student:
   - Staff finds student's RSVP record
   - Marks `attended = true`
   - Records `checked_in_at` timestamp
4. For walk-ins (no registration):
   - Staff creates walk-in record
   - Increments Event.walk_in_count
   - Optionally captures basic information for follow-up

**Postcondition:** Attendance is recorded for analytics and reliability tracking



## 2. MARKETING & DISTRIBUTION

### UC-2.1: Create Marketing Campaign
**Actor:** Regional Coordinator
**Flow:**
1. Coordinator creates Flyer record:
   - Name (e.g., "July North County Events")
   - Distribution date
   - UTM campaign code
   - Upload flyer design file (PDF/image)
2. Coordinator associates Events with Flyer
3. System generates:
   - Short URL slug (e.g., `/f/july-north-county`)
   - Landing page with configured styling
4. Coordinator distributes through channels:
   - Social media posts with link
   - Email campaigns
   - PeachJar submission
   - Partner promotional materials

**Postcondition:** Flyer is live with trackable links to events



### UC-2.2: Track Marketing Attribution
**Actor:** System (automated), Regional Coordinator (reviews)
**Flow:**
1. User clicks link with UTM parameters
2. System captures on Registration:
   - utm_source (Facebook, PeachJar, email, etc.)
   - utm_campaign (specific campaign code)
   - registration_source enum value
3. Coordinator runs reports showing:
   - Registrations per Flyer
   - Conversion rates by source
   - Event page views vs. registrations
4. Data informs future marketing investments

**Postcondition:** Marketing ROI is measurable



### UC-2.3: Send Event Reminder Emails
**Actor:** System (automated)
**Flow:**
1. System identifies Events with date approaching (e.g., 2 days before)
2. For each Event, retrieves all RSVPs where attended is null/pending
3. Sends reminder email to each registrant including:
   - Event details (date, time, venue)
   - Parking and building entry instructions
   - What to bring
   - Cancellation/update link
4. Records email sent for tracking

**Postcondition:** Registrants receive timely reminders to reduce no-shows



## 3. INSTRUCTOR MANAGEMENT

### UC-3.1: Assign Instructor to Event
**Actor:** Regional Coordinator
**Flow:**
1. Coordinator views Event needing instructor assignment
2. Coordinator searches available instructors (Person records with appropriate tier/skills)
3. Coordinator creates InstructorAssignment linking:
   - Person (instructor)
   - Event
   - Role (lead_instructor, assistant, volunteer_support)
   - Employment type (volunteer, stipend, contractor, employee)
   - Hourly rate (if applicable)
   - Partner (employer) if contracted through partner
4. System sends notification to instructor
5. Instructor confirms assignment
6. Assignment marked as confirmed

**Postcondition:** Event has confirmed instructor(s), instructor has event on their schedule



### UC-3.2: Evaluate Instructor Performance
**Actor:** Lead Instructor or Regional Coordinator
**Precondition:** Event has completed, instructor was assigned
**Flow:**
1. Evaluator opens InstructorAssignment for completed event
2. Evaluator creates InstructorEvaluation rating:
   - Technical skills (1-5)
   - Teaching ability (1-5)
   - Reliability (1-5)
   - Student engagement (1-5)
   - Written notes/feedback
   - Checkbox: "Potential hire for partner schools"
3. System updates instructor's Person record:
   - Increments total_events counter
   - Updates aggregate ratings
   - May upgrade volunteer_tier based on performance
4. If marked as "potential hire", instructor's profile becomes visible to partners

**Postcondition:** Instructor performance is documented, talent pipeline is populated



### UC-3.3: Instructor Views Job Opportunities
**Actor:** Instructor/Volunteer
**Precondition:** Instructor has `open_to_employment = true` and good evaluations
**Flow:**
1. Instructor logs into portal
2. System displays JobPostings from Partners in instructor's Metro
3. Instructor filters by:
   - Hourly rate range
   - Hours per week
   - Partner organization
4. Instructor views job details and applies through external partner site
5. Partner independently conducts hiring process

**Postcondition:** Qualified instructors discover employment opportunities



## 4. PARTNER COLLABORATION

### UC-4.1: Partner Delivers Contracted Event
**Actor:** Partner Organization, Regional Coordinator
**Flow:**
1. Coordinator creates Event at Partner's Venue
2. Coordinator assigns Partner to Event
3. Coordinator creates InstructorAssignment for Partner's instructor
4. Partner receives event notification
5. Partner confirms instructor and venue availability
6. Event is marketed through League channels (co-branded)
7. Registrations flow through League system
8. Event happens at Partner location
9. Post-event:
   - Attendance recorded
   - Partner instructor is evaluated
   - Coordinator reports marketing value delivered to Partner
   - Payment processed (if not offset by marketing value)

**Postcondition:** Event delivered, partner receives marketing value, students served



### UC-4.2: Partner Posts Job Opening
**Actor:** Partner Organization
**Flow:**
1. Partner logs into portal
2. Partner creates JobPosting:
   - Title, description
   - Requirements
   - Hourly rate, hours per week
   - Status (open, filled, closed)
3. System makes posting visible to qualified instructors in Partner's Metro
4. Interested candidates apply through Partner's process
5. Partner updates posting status when filled

**Postcondition:** Partner gains access to pre-vetted instructor candidates



### UC-4.3: Establish Funding Partnership with Commitment
**Actor:** Regional Coordinator, Partner Organization (Funder)
**Precondition:** Partner has committed funds for League programming
**Flow:**
1. Coordinator creates or updates Partner record:
   - Sets `is_funder = true`
2. Coordinator creates new Commitment record:
   - `partner` = Partner ID
   - `commitment_type` = enum ("dollar_amount", "event_count", "hybrid")
   - **IF** dollar-based commitment:
     - Sets `dollar_amount` (e.g., $5,000)
     - Sets `current_balance` = dollar_amount
   - **IF** event-count commitment:
     - Sets `event_count` (e.g., 20 events)
     - Sets `events_remaining` = event_count
   - **IF** hybrid:
     - Sets both `dollar_amount` and `event_count`
   - `committed_date` = date commitment was made
   - `start_date` and `end_date` = validity period (optional)
   - `status` = "active"
   - `notes` = contract terms, restrictions, purpose
3. System initializes tracking fields:
   - `events_delivered` = 0
   - `current_balance` = initial dollar_amount
   - `events_remaining` = initial event_count
4. Coordinator can now link events to this commitment

**Postcondition:** Funding commitment established with trackable balance and event count

**Example Scenarios:**
- **Dollar-based:** Partner gives $5,000, events deduct from balance as they complete
- **Event-based:** Partner commits to 20 events, counter decrements as events are delivered
- **Hybrid:** Partner commits $10,000 for up to 30 events, whichever limit is reached first



### UC-4.4: Funder Proposes Event (Coordinator Entry)
**Actor:** Regional Coordinator (on behalf of Funder)
**Precondition:** Funding partnership exists with active Commitment (UC-4.3 completed)
**Flow:**
1. Funder contacts coordinator requesting to fund specific events
2. Coordinator creates Event records with:
   - `proposal_state = "proposed"`
   - `is_tbd = true`
   - `proposed_by_funder = true`
   - `event_date = null` (TBD)
   - `start_time = null`
   - `end_time = null`
   - `funder = [Partner as funder]`
   - `commitment = [Commitment record]`
   - `event_cost = [estimated cost]` (if known)
   - Title, description, capacity (if known)
   - Venue (if proposed/preferred) or null if flexible
3. System links Event to Commitment
4. System validates:
   - **IF** commitment is dollar-based: `current_balance >= event_cost`
   - **IF** commitment is event-based: `events_remaining > 0`
   - **IF** hybrid: both conditions must be met
5. Events appear in "Proposed Events" queue for review
6. Coordinator can batch-create multiple proposed events (e.g., 20 events at once)

**Postcondition:** Proposed events created, linked to commitment, waiting for scheduling and approval

**Business Rule:** Event cannot accept registrations while `proposal_state = "proposed"` or `is_tbd = true`



### UC-4.5: Partner (Funder) Self-Service Event Proposal
**Actor:** Partner Organization (with portal access)
**Precondition:** Partner has funding account and portal login
**Flow:**
1. Partner logs into portal
2. Partner navigates to "Propose Event" form
3. Partner enters event details:
   - Event title (e.g., "Roblox Game Design Workshop")
   - Description
   - Preferred date (optional)
   - Preferred venue (if they want to host at their site)
   - Target audience/age range
   - Preferred topic/curriculum
   - Capacity suggestion
4. Partner submits proposal
5. System creates Event with:
   - `proposal_state = "pending_review"`
   - `is_tbd = true` (if date not specified)
   - `proposed_by_funder = true`
   - `funder = [Partner]`
   - `event_date = [proposed date or null]`
   - `venue = [proposed venue or null]`
6. Coordinator receives notification of new proposal

**Postcondition:** Event proposal submitted for coordinator review

**Example:** A coding school partner proposes they want to host a Roblox workshop at their location on a specific date. Coordinator reviews and approves or adjusts.



### UC-4.6: Review and Approve Proposed Events
**Actor:** Regional Coordinator
**Precondition:** One or more proposed events exist
**Flow:**
1. Coordinator accesses "Proposed Events Dashboard" showing:
   - All events with `proposal_state = "proposed"` or `"pending_review"`
   - Grouped by funder and commitment
   - Shows commitment balance/remaining events for each
   - Sorted by submission date
2. For each event, coordinator reviews:
   - Event details and feasibility
   - Associated commitment's remaining balance/events
   - Venue availability
   - Instructor availability
   - Market demand/strategic fit
3. Coordinator sets `event_cost` if not already specified
4. Coordinator takes action:
   - **APPROVE:** Changes `proposal_state = "approved"`
   - **REJECT:** Changes `proposal_state = "rejected"` with notes
   - **REQUEST CHANGES:** Adds notes and keeps in pending state
5. System does NOT deduct from commitment until event is completed
6. Partner receives notification of decision

**Postcondition:** Events are approved/rejected, ready for scheduling or archived

**Business Rule:** Approving an event reserves it against the commitment but doesn't deduct until completion



### UC-4.7: Schedule Approved Events
**Actor:** Regional Coordinator
**Precondition:** Events have `proposal_state = "approved"` and `is_tbd = true`
**Flow:**
1. Coordinator accesses "Events to Schedule" queue
2. For each event, coordinator:
   - Selects specific date and time
   - Confirms or assigns venue
   - Assigns instructors (creates InstructorAssignment)
   - Sets final capacity
3. Coordinator updates Event:
   - `event_date = [selected date]`
   - `start_time = [selected time]`
   - `end_time = [selected time]`
   - `is_tbd = false`
   - `status = "scheduled"`
   - `venue = [confirmed venue]`
4. System makes event visible for public registration
5. Marketing materials can now be created for event

**Postcondition:** Event is fully scheduled and ready for registration



### UC-4.8: AI-Assisted Batch Event Scheduling
**Actor:** Regional Coordinator (with AI assistant)
**Precondition:** Multiple approved but unscheduled events exist
**Flow:**
1. Coordinator accesses "AI Scheduling Assistant"
2. System presents all approved TBD events for selected Metro
3. Coordinator provides constraints:
   - Date range for scheduling (e.g., next 3 months)
   - Venue availability/preferences
   - Instructor availability
   - Maximum events per week
   - Desired spacing between similar topics
4. AI analyzes:
   - Venue calendars and capacity
   - Instructor schedules and specializations
   - Historical attendance patterns by day/time
   - Geographic distribution
   - Topic diversity across dates
5. AI proposes schedule:
   - Suggests specific dates/times for each event
   - Assigns venues based on capacity needs
   - Recommends instructor pairings
   - Highlights conflicts or concerns
6. Coordinator reviews proposals:
   - Accepts/rejects individual suggestions
   - Adjusts dates/venues as needed
   - Overrides instructor assignments
7. Coordinator confirms batch schedule
8. System updates all events:
   - Sets dates, times, venues
   - Creates InstructorAssignments
   - Changes `is_tbd = false`
   - Sets `status = "scheduled"`
9. Events become available for registration
10. Instructors receive assignment notifications

**Postcondition:** Large batch of events scheduled efficiently with optimized resource allocation

**AI Optimization Goals:**
- Maximize venue utilization
- Balance instructor workload
- Optimize geographic distribution
- Create diverse topic mix across dates
- Minimize conflicts and gaps
- Consider historical demand patterns

**Example:** Coordinator has 20 funded events from a partner. AI proposes spreading them across 10 weeks with 2 events per week, optimizing for different venues, varied topics, and instructor availability.



### UC-4.9: Track Funded Event Completion and Update Commitments
**Actor:** System (automated), Regional Coordinator (monitors)
**Precondition:** Events linked to commitments are being delivered
**Flow:**
1. When event completes (date passes and attendance recorded), system:
   - Updates Event `status = "completed"`
   - Retrieves linked Commitment record
   - **IF** commitment is dollar-based:
     - Deducts `event_cost` from `current_balance`
     - `current_balance = current_balance - event_cost`
   - **IF** commitment is event-based:
     - Decrements `events_remaining`
     - `events_remaining = events_remaining - 1`
   - **IF** hybrid:
     - Performs both operations
   - Increments `events_delivered` counter
   - **IF** balance reaches zero OR events_remaining reaches zero:
     - Updates `status = "depleted"`
2. Coordinator dashboard shows for each commitment:
   - Original commitment (events and/or dollars)
   - Events delivered
   - Current balance (if dollar-based)
   - Remaining events (if event-based)
   - Projected completion date
   - List of all events funded by this commitment
3. System alerts coordinator when:
   - Commitment approaches depletion (90% used)
   - Balance/events run low
   - Opportunity for contract renewal
4. Coordinator can generate commitment report showing:
   - All events funded by commitment
   - Total students served
   - Geographic distribution
   - Topics covered
   - ROI and impact metrics
   - Cost per event analysis
5. Coordinator can view Partner's history of all commitments:
   - Past commitments (depleted/expired)
   - Active commitments
   - Total lifetime contribution
   - Total events funded

**Postcondition:** Commitment balances accurately reflect delivered events, renewal opportunities identified

**Business Rule:** One event can have both a `partner` (host) and a `funder` (financial sponsor) - these can be the same or different organizations. Events are linked to specific Commitment records, not just to Partners.

**Example:** 
- Partner has Commitment for $5,000
- Event 1 costs $250, completed → Balance becomes $4,750
- Event 2 costs $300, completed → Balance becomes $4,450
- 18 events remaining to fully utilize the $5,000 commitment



### UC-4.10: Attach Funding Source to Existing Event
**Actor:** Regional Coordinator
**Precondition:** Event exists (scheduled or proposed), active Commitment exists
**Flow:**
1. Coordinator views Event detail
2. Coordinator selects "Assign Funding Source" option
3. System displays available commitments with:
   - Partner name
   - Commitment type (dollar/event/hybrid)
   - Remaining balance (if dollar-based)
   - Remaining event count (if event-based)
   - Any funding restrictions/preferences
   - Status (active/depleted/expired)
4. Coordinator selects commitment
5. Coordinator enters/confirms `event_cost`
6. System validates:
   - **IF** dollar-based: `current_balance >= event_cost`
   - **IF** event-based: `events_remaining > 0`
   - Commitment status is "active"
7. System updates Event:
   - `funder = [Partner who owns commitment]`
   - `commitment = [selected Commitment]`
   - `event_cost = [entered cost]`
   - Links event to commitment
8. Instructor assignments can now be marked as paid (not volunteer)
9. Event appears in commitment's funded events list

**Postcondition:** Event funding source identified, linked to specific commitment, instructor payment authorized

**Use Case:** Coordinator realizes a previously scheduled event can be paid for by a funder's commitment, converts volunteer instructors to paid status



### UC-4.11: Create Additional Commitment for Existing Partner
**Actor:** Regional Coordinator
**Precondition:** Partner is already established as funder
**Flow:**
1. Partner renews or adds additional funding
2. Coordinator creates new Commitment record for same Partner:
   - Links to existing Partner
   - New commitment amount/event count
   - New dates and terms
   - Status = "active"
3. System maintains history:
   - Previous commitments remain in system (status = "depleted" or "expired")
   - New commitment is separate, independently tracked
4. Events can be assigned to specific commitment
5. Reports show:
   - Individual commitment performance
   - Partner's total lifetime contribution across all commitments

**Postcondition:** New commitment created, previous commitments preserved for historical tracking

**Example:** Partner had a commitment for $5,000 that was fully used. They now commit another $10,000. Both commitments are tracked separately.



### UC-4.12: View Commitment Balance and Projection
**Actor:** Regional Coordinator
**Precondition:** Active commitments exist with linked events
**Flow:**
1. Coordinator accesses "Commitment Dashboard"
2. For each active commitment, system displays:
   - Partner name
   - Commitment type and original amount
   - Current balance / remaining events
   - Percentage utilized
   - Events delivered count
   - **Approved but not completed events:**
     - List of scheduled events linked to commitment
     - Reserved amounts (not yet deducted)
     - Projected future deductions
   - **Proposed events:**
     - Events pending approval linked to commitment
     - Potential future utilization
   - Projected depletion date
   - Commitment validity period (start/end dates)
3. Coordinator can filter by:
   - Partner
   - Metro
   - Status (active, nearly depleted, expired)
   - Commitment type
4. System calculates:
   - Available balance (current balance minus reserved amounts)
   - True remaining capacity for new events

**Postcondition:** Coordinator has clear visibility into commitment utilization and capacity for planning

**Business Rule:** System tracks three states of commitment utilization:
1. **Delivered** - events completed, balance deducted
2. **Reserved** - events approved/scheduled, balance not yet deducted
3. **Available** - remaining capacity for new events





## 5. VOLUNTEER PIPELINE

### UC-5.1: Volunteer Progresses Through Tiers
**Actor:** Volunteer, Regional Coordinator
**Flow:**
1. **Tier 1 Entry:**
   - Person attends orientation webinar
   - Observes first event (no background check yet)
   - Completes 3-hour training
   - Background check processed
   - Begins assisting at events
2. **Progression to Tier 2:**
   - Volunteer completes 5+ events with strong evaluations (4+ average)
   - Coordinator invites to Program Instructor Training (6 hours)
   - Volunteer co-teaches full program series
   - Upon success, volunteer can lead programs independently
3. **Progression to Tier 3:**
   - Experienced volunteer wants to run independent club
   - Completes Community Club Leader training (4 hours)
   - Receives curriculum access and ongoing support
   - Runs club at their own organization

**Postcondition:** Volunteers develop skills, take on more responsibility, create sustainable programming



## 6. ADMINISTRATIVE & REPORTING

### UC-6.1: Generate Metro Performance Report
**Actor:** National Program Manager, Regional Coordinator
**Flow:**
1. User selects reporting period and Metro
2. System generates report including:
   - Total events delivered
   - Total students served (unique Person records)
   - Demographics breakdown (when available)
   - Attendance vs. registration ratio
   - Volunteer hours contributed
   - Partner engagement metrics
   - Marketing attribution summary
3. Report exported for funder reporting

**Postcondition:** Impact metrics available for stakeholder communication



### UC-6.2: Monitor Event Capacity and Waitlists
**Actor:** Regional Coordinator
**Flow:**
1. System tracks Event.available_slots as registrations occur
2. When capacity reached, new registrations added to waitlist
3. If cancellation occurs:
   - System automatically emails first person on waitlist
   - Offers spot with time-limited response window
4. Coordinator reviews waitlist reports to identify:
   - High-demand topics
   - Need for additional sessions
   - Venue capacity constraints

**Postcondition:** Popular events identified, additional sessions scheduled



## 7. VENUE & LOGISTICS

### UC-7.1: Schedule Event at Venue
**Actor:** Regional Coordinator
**Flow:**
1. Coordinator selects Venue for new Event
2. System checks Venue capacity
3. Coordinator sets Event capacity (may be less than Venue.capacity)
4. Event includes Venue-specific details:
   - parking_instructions
   - building_entry_instructions
5. These details appear in:
   - Registration confirmation emails
   - Reminder emails
   - Event detail page
6. Venue staff receive notification of scheduled event

**Postcondition:** Venue is prepared, families have clear logistics information



## TECHNICAL USE CASES

### UC-T.1: Short URL Generation and Resolution
**Actor:** System
**Flow:**
1. When Flyer created, system generates short URL:
   - Uses Metro.short_url_domain (e.g., "sd.lotm.org")
   - Creates slug from Flyer name
   - Full URL: `https://sd.lotm.org/f/summer-2025`
2. When user accesses short URL:
   - System resolves to Flyer record
   - Applies routing logic (single event vs. multiple)
   - Preserves UTM parameters throughout

**Postcondition:** Trackable, memorable URLs for marketing



### UC-T.2: Email List Segmentation
**Actor:** Regional Coordinator
**Flow:**
1. Coordinator defines email campaign
2. System queries Person records filtering by:
   - Metro location
   - Tags (interests like robotics, Python, game-dev)
   - Past attendance patterns
   - Geographic proximity to venue
3. System generates segmented recipient list
4. Coordinator sends targeted announcement
5. System tracks open rates and click-throughs

**Postcondition:** Relevant families receive appropriate communications



## BUSINESS RULES EMBEDDED IN USE CASES

1. **Registration Flexibility:** Not all events require registration; some allow walk-ins or don't track attendance
2. **Account Optional:** Users can register without creating accounts, but accounts improve user experience
3. **Reliability Tracking:** System tracks registration vs. attendance patterns even without accounts (via email matching)
4. **Volunteer Pipeline:** Clear tier progression (1→2→3) with defined evaluation criteria
5. **Marketing Attribution:** All registrations capture source for ROI analysis
6. **Partner Value Exchange:** Marketing value can offset event delivery costs
7. **Privacy:** Evaluations and detailed feedback visible only to staff; aggregate ratings shown to partners
8. **Geographic Scope:** Metro boundaries determine which instructors and partners are relevant to which events



## FUTURE USE CASES (Post-MVP)

- UC-F.1: Automated waitlist management with SMS notifications
- UC-F.2: Family portal showing child's learning progression across events
- UC-F.3: Partner self-service event creation and instructor assignment
- UC-F.4: Integrated payment processing for any fee-based workshops
- UC-F.5: Gear library equipment reservation and tracking
- UC-F.6: Volunteer self-scheduling through calendar interface
- UC-F.7: Multi-language support for Spanish-speaking families
- UC-F.8: Integration with school district data systems for demographics