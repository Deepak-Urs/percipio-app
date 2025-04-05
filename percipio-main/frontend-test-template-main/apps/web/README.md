# Running the UI

To run the UI only, run the following script from the `web` directory:

```
pnpm install
```

```
pnpm run start:dev
```

and the app should be running on `http://localhost:5173/`.


Below is a structured README summary that covers a brief overview of the app, the core functionalities implemented, the enhancement we added, and the reset feature. You can include this in your README file for the reviewer:

---

# Frontend Challenge Solution

## Summary of the App

This project is a solution for the Digital-Health-AI-Startup frontend challenge. The app simulates a system that receives patient health data and generates "discoveries" (insights). It provides a clean, responsive interface for clinicians to review these discoveries, select them for further review, and mark them as acknowledged.

---

## Core Functionalities Implemented

1. **Sample Data Generation:**  
   - Generated 100 sample discoveries with unique IDs, timestamps, types, severity levels, titles, and descriptions to simulate real patient data.

2. **Reverse-Chronological Order Display:**  
   - Discoveries are sorted so that the most recent insights appear at the top, ensuring that clinicians see the latest information first.

3. **Modular Component Structure:**  
   - The codebase is organized into modular components:  
     - **PatientHeader** – displays patient details.  
     - **DiscoveryItem** – renders a single discovery with an icon, title, description, date/time, and severity chip.  
     - **DiscoveryList** – maps through the discoveries and renders DiscoveryItem components.  
     - **DiscoveriesSection** – manages state (active vs. acknowledged, infinite scroll, tab switching, selection, and persistence).

4. **Responsive Design:**  
   - Using Material-UI’s responsive breakpoints, the app adapts to mobile, tablet, and desktop screen sizes with appropriate layout adjustments.

5. **Card-Like Discovery Items:**  
   - Each discovery is displayed as a card with a subtle grey background, rounded corners, and proper padding to ensure a neat, visually appealing layout.

6. **Selection and Submission:**  
   - Clinicians can select active discoveries via checkboxes and click a SUBMIT button to move them to the Acknowledged list. The state is persisted in localStorage.

---

## Enhancement Implemented

1. **Infinite Scroll:**  
   - The Active discoveries list initially shows 25 items. As the user scrolls near the bottom, an infinite scroll mechanism automatically loads 25 more items at a time.
   - A brief spinner is displayed during the load to indicate that new data is being fetched.

---

## Mini Reset Functionality

2. **Reset Button:**  
    - A RESET button is provided next to the tab controls. When clicked, it clears the persisted data from localStorage and resets the state (acknowledged discoveries, selected IDs, and visible count), allowing the user to start fresh.

---