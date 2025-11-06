# Design Guidelines: Discord Verification System

## Design Approach

**Reference-Based Design** inspired by lovable.dev's aesthetic:
- Clean, centered single-purpose interface
- Modern minimalist approach with focus on the verification action
- Blurred background imagery with clear foreground content
- Smooth, professional transitions between states

## Typography

**Font Stack:**
- Primary: Inter (via Google Fonts CDN)
- Weights: 400 (regular), 600 (semibold), 700 (bold)

**Hierarchy:**
- Page Title: text-4xl md:text-5xl font-bold
- Body Text: text-lg md:text-xl font-normal
- Button Text: text-base font-semibold
- Success Message: text-2xl md:text-3xl font-bold
- Secondary Info: text-sm md:text-base

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16
- Component padding: p-8 md:p-12
- Vertical spacing: space-y-6 md:space-y-8
- Button padding: px-8 py-4

**Container Structure:**
- Full viewport height: min-h-screen
- Centered content: flex items-center justify-center
- Content card: max-w-md w-full with backdrop-blur effect
- Responsive padding: px-4 md:px-8

## Component Library

### Verification Card
- Semi-transparent card with backdrop-blur-xl
- Rounded corners: rounded-2xl
- Shadow: shadow-2xl
- Padding: p-8 md:p-12
- Centered text alignment

### Primary Button (Verify)
- Large, prominent CTA: w-full py-4 px-8
- Rounded: rounded-xl
- Font: text-base font-semibold
- Background: Blurred with backdrop-filter
- Disabled state during processing

### Discord Logo/Branding
- Centered at top of card: w-16 h-16 md:w-20 md:h-20
- Use Discord logo icon via CDN or Font Awesome brand icons
- Margin below: mb-6

### Loading State
- Animated spinner during verification process
- Centered position with pulse animation
- Size: w-8 h-8

### Success State
- Checkmark icon: w-16 h-16
- Success message with countdown timer
- "Redirigiendo en X segundos..." text

## Page States

### 1. Initial Verification State
- Discord logo at top
- Welcome heading: "Verificación de Discord"
- Descriptive text: "Haz clic en verificar para confirmar tu identidad"
- Primary "Verificar" button
- Server name display (if available)

### 2. Processing State
- Loading spinner replaces button
- Text: "Verificando..."
- Disabled interaction state

### 3. Success State
- Checkmark icon
- Success heading: "¡Verificación Exitosa!"
- Countdown message: "Redirigiendo a Discord en X segundos..."
- Visual confirmation feedback

### 4. Error State (if needed)
- Error icon
- Error message
- Retry button

## Background Treatment

**Hero Background Image:**
- Full-screen background: Fixed position, covers entire viewport
- Heavy blur effect: backdrop-blur-3xl or CSS blur(20px)
- Overlay gradient: Dark gradient overlay (opacity 40-60%) for readability
- Image positioning: object-cover to maintain aspect ratio

## Visual Hierarchy

**Content Layering:**
1. Blurred background image (lowest layer)
2. Dark gradient overlay (middle)
3. Semi-transparent verification card (highest)

**Z-index structure:**
- Background: z-0
- Overlay: z-10
- Content card: z-20

## Interaction Design

**Button States:**
- Default: Blurred background with subtle border
- Hover: Brightness increase, subtle scale (scale-105)
- Active: Scale down (scale-95)
- Processing: Disabled with spinner
- All button backgrounds should use backdrop-blur

**Transitions:**
- State changes: transition-all duration-300
- Button interactions: transition-transform duration-200
- Page redirects: Smooth fade with 4-second countdown

## Responsive Behavior

**Mobile (base):**
- Single column layout
- Card padding: p-6
- Font sizes: Smaller scale
- Full-width card with side margins

**Desktop (md:):**
- Centered card with max-width constraint
- Larger typography scale
- Increased spacing
- Enhanced blur effects

## Accessibility

- High contrast text on blurred backgrounds
- Clear focus states for keyboard navigation
- Aria labels for all interactive elements
- Loading states announced to screen readers
- Success/error messages with proper ARIA roles

## Images

**Background Image:**
- Single full-screen blurred background image
- User-provided or placeholder gradient
- Heavily blurred (20-30px blur)
- Covered with semi-transparent dark overlay
- Should evoke Discord brand aesthetic (purple/blue tones work well)

**Icons:**
- Discord logo icon (top of card)
- Verification checkmark (success state)
- Loading spinner (processing)
- Use Font Awesome or Heroicons via CDN

This creates a focused, professional verification experience that mirrors lovable.dev's clean aesthetic while maintaining Discord's brand feel.