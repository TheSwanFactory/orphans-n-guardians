# Orphans and Guardians: Developer Onboarding Document

## 1. Project Overview

“Orphans and Guardians” is a server-rendered, turn-based solo RPG built using
the Deno Fresh framework. The game logic and data management are fully
server-side, leveraging Deno’s native KV store for persistence and TypeScript
for type safety.

The architecture is optimized for simplicity, scalability, and deployability in
edge environments like Deno Deploy. This document provides a comprehensive
overview of the architecture, key components, and a prioritized work list for
development.

## 2. Architecture

### 2.1 Key Components

#### Frontend

- Fully server-rendered using Fresh.
- No dedicated client-side JavaScript; interactions are handled via form
  submissions and server-rendered responses.

#### Backend

- Routes are defined using Fresh’s filesystem-based routing.
- Game logic is encapsulated in reusable TypeScript classes (Actor, Attributes).
- Deno KV is used for persistence, storing game state like player attributes,
  actors, and zones.

Data Storage

- Deno KV: Persistent storage for:
- Actor attributes (raw and now).
- Game zones and encounters.
- Metadata (e.g., player name).
- Game Data: Hardcoded initial data (actors, zones) is embedded as a TypeScript
  module (data/game_data.ts) for deployability.

### 2.2 Game Flow

#### 1. Initialization

- The user enters a username, which initializes their game state in Deno KV.
- Predefined actors, zones, and encounters are loaded from data/game_data.ts.

#### 2. Exploration

- The user navigates through zones and encounters dynamically generated from
  game state.
- Encounters include actions like Confront, Discern, and Align.

#### 3. Encounters

- Actions are resolved server-side, updating player and encounter states in Deno
  KV.

#### 4. Persistence

- Each action writes updated game state to Deno KV, ensuring consistency across
  requests.

### 2.3 Data Structures

Attributes

Attributes represent an actor’s traits, divided into raw (base) and now
(current) values.

interface Attributes { resilience: number; // Ability to withstand challenges
curiosity: number; // Ability to discern information empathy: number; // Ability
to connect or reconcile agency: number; // Ability to act decisively }

Actor

An actor represents a player or any entity with attributes (e.g., monsters,
guardians).

interface Actor { id: string; name: string; raw: Attributes; // Base attributes
now: Attributes; // Current attributes, adjusted by gameplay effects }

Zone

A zone represents a location with a series of encounters.

interface Zone { id: string; name: string; description: string; encounters:
Encounter[]; }

Encounter

An encounter represents a challenge or interaction within a zone.

interface Encounter { type: string; // e.g., "monster", "treasure" actorId:
string; }

Game Data

Preloaded in data/game_data.ts:

export const gameData = { actors: [ { id: "player", name: "Player", raw: {
resilience: 3, curiosity: 2, empathy: 1, agency: 2 }, now: { resilience: 3,
curiosity: 2, empathy: 1, agency: 2 }, }, { id: "guardian", name: "Guardian",
raw: { resilience: 2, curiosity: 1, empathy: 0, agency: 1 }, now: { resilience:
2, curiosity: 1, empathy: 0, agency: 1 }, }, ], zones: [ { id: "haunted_forest",
name: "Haunted Forest", description: "A dark and eerie forest full of dangers.",
encounters: [{ type: "monster", actorId: "guardian" }], }, ], };

## 3. Development Work List

### 3.1 Core Development Tasks

#### 1. Model Layer

- Attributes Class:
- Encapsulates actor traits with methods for penalties, healing, and resetting.
- Example:

class Attributes { resilience: number; curiosity: number; empathy: number;
agency: number;

applyPenalty(attribute: keyof Attributes, amount: number): void {
this[attribute] = Math.max(0, this[attribute] - amount); }

heal(attribute: keyof Attributes, amount: number, max: number): void {
this[attribute] = Math.min(this[attribute] + amount, max); } }

- Actor Class:
- Manages raw (base) and now (current) attributes.
- Methods for actions (e.g., performAction) and state resets.
- KV Integration:
- Persistence utilities for saving/loading Actor and Zone objects to/from Deno
  KV.

#### 2. Server-Side Routes

- Login Route (/):
- Collects the username and initializes game state in KV using hardcoded game
  data.
- Game Route (/game/[username]):
- Fetches player and zone data from KV.
- Displays current state and allows actions via form submissions.
- Action Handler (POST /game/[username]/action):
- Processes actions like Confront, updating player and encounter states in KV.

#### 3. Game Data Integration

- Embed hardcoded game data (actors, zones, encounters) in data/game_data.ts.
- Dynamically initialize game state in KV using this data during login.
