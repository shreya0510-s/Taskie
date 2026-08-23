# Lotus Tasks

Build a complete desktop-first personal To-Do web application called Lotus Tasks.

The goal is to create a polished, functional personal productivity dashboard that I can actually use every day.

DESIGN

Use a dark, elegant, calm aesthetic.

Color palette:

Very dark navy/black background

Dark charcoal cards

Muted lavender/purple as the primary accent

Subtle blue, pink, orange, and green accents only for category indicators

Soft off-white text

NO neon colors

NO overly bright colors

NO excessive gradients

NO excessive glassmorphism

The overall feeling should be:

minimal + premium + calm + cozy + modern

Use:

Rounded cards

Subtle borders

Soft shadows

Clean spacing

Modern typography

Minimal line icons

Subtle hover and transition effects

The design should closely follow this structure:

LEFT SIDEBAR → MAIN CONTENT → RIGHT INFO PANEL

This is a desktop/laptop application, NOT a mobile-first design.

Prioritize 1440×900, 1366×768 and 1280×720 desktop layouts.

MAIN LAYOUT

LEFT SIDEBAR

Create a fixed dark sidebar.

At the top:

Lotus Tasks

with a small elegant checkmark/lotus-inspired icon.

Navigation:

My Day

All Tasks

Important

Planned

Completed

Trash

Each should have a simple icon.

"My Day" is selected by default with a subtle muted-purple highlight.

Below navigation, create:

Lists + button

Default lists:

College

Projects

Personal

Bharatanatyam

Health

Each list has:

small colored circular indicator

list name

number of tasks

At the bottom:

+ Add New List

Allow the user to create, rename and delete lists.

MAIN CONTENT

At the top:

Good evening, Shreya! 🌙

Below:

Let's get some things done.

The greeting should automatically change between:

Good morning

Good afternoon

Good evening

On the right side of the header:

Search icon

Notification icon

Circular avatar with "S"

Keep these subtle.

ADD TASK

Below the greeting, create a large rounded input card.

Placeholder:

What do you want to do?

Button:

Add Task

The user can:

type a task

press Enter

click Add Task

When adding a task, allow:

task title

list/category

due date

important/starred status

Keep task creation simple and clean.

TODAY

Create:

Today + dynamic task count

Display today's tasks as horizontal cards.

Each task card contains:

circular checkbox

task title

category badge if applicable

star icon

Example initial tasks:

Finish React project — Projects

DSA practice – Arrays & Strings — College

Bharatanatyam practice — Bharatanatyam

Read 20 pages — Personal

When completed:

checkbox becomes checked

task title gets a subtle strikethrough

task becomes visually muted

statistics update automatically

Clicking the star toggles Important.

UPCOMING

Below Today create:

Upcoming + dynamic task count

Show upcoming tasks with:

checkbox

task title

category

due date

Example:

System Design notes — College — Tomorrow

Workout — Health — Tomorrow

Prepare project presentation — Projects — upcoming date

RIGHT PANEL

Create a clean vertical panel containing four cards.

1. OVERVIEW

Show:

Total
Completed
Pending

These numbers must be calculated dynamically from the actual tasks.

Do NOT hardcode the statistics.

2. TODAY'S FOCUS

Create a small motivational card containing:

“Discipline is choosing between what you want now and what you want most.”

Add a subtle lotus-inspired decorative element.

Keep it minimal.

3. CALENDAR

Create a compact monthly calendar.

Requirements:

show current month

previous/next month buttons

highlight today's date with muted purple

clicking a date should show/filter tasks for that date

Keep it compact.

4. QUICK ACTIONS

Create:

+ Add Task

and

Add Reminder

For V1, Add Reminder can simply open a small "Reminders coming soon" dialog. Do NOT build a notification backend.

CORE FUNCTIONALITY

This must be a REAL working application, not a static mockup.

Implement:

Tasks

Add task

Edit task

Complete/uncomplete task

Delete task

Mark/unmark important

Set due date

Assign category/list

Navigation

My Day

All Tasks

Important

Planned

Completed

Trash

These views must actually filter the tasks.

Lists

Create list

Rename list

Delete list

Assign tasks to lists

Filter by list

Search

The search icon should open a search interface.

Search tasks by:

task title

category/list

Results should update immediately.

DATA STORAGE

Do NOT create authentication, user accounts, cloud databases, or backend services for V1.

Use browser localStorage.

Persist:

tasks

completion status

important status

due dates

categories/lists

Refreshing the browser must NOT erase the user's tasks.

INITIAL DATA

On the first launch only, create a small set of example tasks:

Finish React project

DSA practice – Arrays & Strings

Bharatanatyam practice

Read 20 pages

System Design notes

Workout

Prepare project presentation

These should behave exactly like normal tasks.

Once the user starts using the app, do not recreate deleted tasks or duplicate the demo data.

EMPTY STATES

Create friendly empty states.

For example:

No tasks today:

Nothing planned for today 🎉

No completed tasks:

Completed tasks will appear here.

No search results:

No tasks found.

UX

Use subtle:

hover effects

transitions

checkbox animations

button feedback

Do NOT use flashy animations.

Make the interface feel smooth and satisfying.

Common actions should be keyboard friendly.

Use accessible buttons and meaningful labels.

TECHNICAL STRUCTURE

Use:

React

TypeScript

Tailwind CSS

Use reusable components rather than one huge component.

Suggested structure:

components/

Sidebar

TaskCard

TaskList

AddTask

Calendar

StatsCard

QuickActions

Modal

Keep the code clean, readable and easy for a beginner developer to understand.

IMPORTANT SCOPE RULE

For this V1, DO NOT add:

Authentication

User accounts

Backend

Cloud database

AI features

Complex notifications

Email

Social features

Collaboration

Mobile-specific navigation

Unnecessary settings pages

Focus entirely on making the desktop UI beautiful and the core To-Do functionality reliable.

FINAL REQUIREMENT

Before finishing:

Make sure the application compiles without errors.

Make sure adding tasks works.

Make sure editing works.

Make sure completing/uncompleting works.

Make sure deleting works.

Make sure Important works.

Make sure category/list filtering works.

Make sure navigation works.

Make sure search works.

Make sure localStorage persistence works.

Make sure statistics update dynamically.

Make sure the desktop layout looks polished.

Make sure there are no broken buttons or placeholder UI except the intentional "Reminders coming soon" dialog.

Build the complete working application now.

Prioritize quality and functionality over adding extra features.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bda7a99e-ffd8-415e-a306-d3b4f0675011).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
