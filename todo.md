# FraudLens — Project TODO

## Landing Page
- [x] Hero section with value proposition and key metrics
- [x] Free first scan CTA button
- [x] Feature highlights section
- [x] Pricing transparency section
- [x] Navigation header with login/signup

## Onboarding Wizard
- [x] Step 1: Video upload (drag-and-drop + file picker)
- [x] Step 2: Google Drive link input (read-only folder sharing)
- [x] Step 3: AI scene preview (frame extraction + Vision API analysis)
- [x] Step 4: Interactive coordinate drawing tool (canvas overlay)
- [x] Step 5: Job configuration dropdown (detection type selector)
- [x] Step 6: Client details capture form (business info + reporting preferences)
- [ ] Multi-sector templates (Gas Station, Owner-Operator, Retail)
- [x] Progress indicator across wizard steps

## AI Integration
- [ ] OpenAI Vision API integration for scene description
- [ ] Frame extraction from video files
- [ ] Google Drive video access (OAuth + read-only link handling)
- [ ] Backend endpoint for AI scene analysis

## Coordinate Drawing Tool
- [ ] Canvas-based zone drawing (bounding boxes)
- [ ] Zone labeling (Cash Register, Receipt Printer, Customer Area)
- [ ] Edit/delete zones functionality
- [ ] Zone persistence in wizard state

## Dashboard Preview
- [x] Mock forensic PDF report preview
- [x] Narrated video clips demonstration
- [x] Sample analysis results display
- [x] Report download functionality

## Backend & Database
- [ ] User authentication (Manus OAuth)
- [ ] Video upload handling (S3 storage)
- [ ] Onboarding session persistence
- [ ] Client details storage
- [ ] Analysis job tracking

## Responsive Design
- [x] Mobile optimization (managers on floor) - Tailwind responsive design
- [x] Desktop optimization (owners in office) - Container and grid layouts
- [x] Tablet responsiveness - Grid breakpoints
- [ ] Touch-friendly coordinate drawing - Canvas interaction refinement

## Testing
- [x] Unit tests for onboarding state management and validation (26 tests passing)
- [ ] Integration tests for onboarding flow
- [ ] Vision API mock tests

## Deployment & Polish
- [ ] Design system finalization
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Accessibility review (WCAG compliance)
