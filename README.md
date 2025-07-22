# Startup Evaluator

A modern, responsive web app for validating startup ideas with instant AI-powered insights. Built for founders, students, and innovators who want fast, actionable feedback.

## Features
- **Landing Page**: Marketing-focused, explains the product, shows sample analysis, and encourages users to try the app.
- **Web App**: Lets users input their startup idea and receive a detailed analysis (market potential, risks, suggestions, validation strategy, and verdict).
- **Navigation**: Simple navigation between the landing page and the analysis app.
- **Responsive Design**: Mobile-first, works beautifully on all devices.

## Project Structure
- `src/` — Standard React app entry (index.js, index.css, etc.)
- `startup_evaluator.tsx` — Main app logic, contains both the landing page and the analyzer app components.
- `public/` — Static assets.
- `tailwind.config.js` — Tailwind CSS configuration for utility-first styling.

## How It Works
- **Landing Page**: 
  - Hero section with call-to-action.
  - "How It Works" steps.
  - Sample analysis (accordion style for details).
  - Social proof and testimonials.
  - Final call-to-action.
- **Analyzer App**:
  - Users describe their idea in a text area.
  - Click "Get AI Analysis" to receive instant feedback (demo logic, can be connected to real AI backend).
  - Results are shown in a clear, sectioned report.
  - Users can analyze another idea or return to the landing page.

## Code Overview
- **startup_evaluator.tsx**
  - `LandingPage` component: Handles all landing/marketing content and navigation to the app.
  - `AnalyzerApp` component: Handles idea input, analysis logic, and displaying results.
  - `App` component: Controls which view is shown (landing or app) using React state.
- **Styling**: Uses Tailwind CSS for all layout and responsive design. Utility classes ensure mobile, tablet, and desktop support.

## How to Run/Modify
1. Install dependencies: `npm install`
2. Start the app: `npm start` (runs on http://localhost:3000)
3. To modify the landing page or app, edit `startup_evaluator.tsx`.
4. For global styles, use `src/index.css` and Tailwind utilities.

## Customization
- To connect to a real AI backend, replace the demo analysis logic in `AnalyzerApp` with an API call.
- To change the landing page content, edit the relevant sections in `LandingPage`.
- To adjust styling, use Tailwind classes or update the Tailwind config.

## Responsive Design
- The layout uses Tailwind's responsive utilities (`md:`, `lg:`, etc.) to ensure all sections adapt to different screen sizes.
- Test on mobile and desktop for best results.

## License
MIT. Use and modify freely for your own startup projects!
