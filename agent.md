# Project Context: Lolo Blends (Lolo_file)

## Overview
This project is a single-page e-commerce landing page for "Lolo Blends" (خلطات لولو), a Moroccan brand selling natural hair oil ("Zayt Al-Barouka"). The site is designed to convert visitors into customers via Cash on Delivery (COD) orders or WhatsApp inquiries.

## Tech Stack
- **Core**: HTML5, Vanilla JavaScript.
- **Styling**: Tailwind CSS (loaded via CDN), Custom CSS in `<style>` block.
- **Fonts**: Google Fonts (Manrope, Noto Sans Arabic, Material Symbols Outlined).
- **Icons**: Material Symbols Outlined.
- **Backend/Services**: 
  - **Web3Forms** for email notifications (Admin & Customer).
  - **LocalStorage** for cart persistence, theme preference, and language selection.

## Key Features
1. **Localization**: 
   - Full support for Arabic (RTL) and French (LTR).
   - Language toggle persists in LocalStorage.
   - Dynamic content updates based on selected language.

2. **E-commerce Functionality**:
   - **Product Bundles**: Display of 1, 2, or 3 bottle packs with pricing.
   - **Shopping Cart**: Mini-cart drawer with add/remove logic.
   - **Stock Management**: Simulated limited stock for the 3-bottle pack (persisted daily).
   - **Checkout**: 
     - COD Form with validation (Name, Phone, City, Address).
     - WhatsApp direct ordering buttons.

3. **UI/UX**:
   - **Responsive Design**: Mobile-first approach with a sidebar navigation for mobile.
   - **Dark Mode**: Toggleable dark/light theme.
   - **Animations**: Reveal on scroll, hover effects, smooth scrolling.
   - **Video Background**: Hero section features a background video (conditional autoplay based on connection).

4. **SEO & Analytics**:
   - **Meta Tags**: Comprehensive SEO tags for title, description, keywords, and Open Graph/Twitter cards.
   - **Structured Data**: JSON-LD for Organization, Product, and FAQPage.
   - **Analytics**: Event tracking hooks (ready for GA4/Segment).

## File Structure
- `index.html`: The main and only source code file containing HTML, CSS, and JS.
- `assets/`: Directory containing images and videos.
  - `Lolo-1/`: Subdirectory for brand assets.
  - `lolonewpic/`: Subdirectory for product images.
- `README.md`: Minimal project documentation.

## Key Logic (in index.html)
- **State Management**: `cart` object tracks items; `currentLang` tracks language.
- **Form Handling**: `contactForm` listener handles validation and submission to Web3Forms.
- **Phone Validation**: Regex for Moroccan phone numbers (`/^(?:\+?212|0)(?:6|7)\d{8}$/`).
- **Stock Logic**: `initStockB3` initializes a daily fake stock count for urgency.

## External Dependencies
- Tailwind CSS script: `https://cdn.tailwindcss.com?plugins=forms,container-queries`
- Google Fonts
- Web3Forms API (Key: `d2d6a608-1dfc-4e9b-8852-962cb1dc8a20`)
