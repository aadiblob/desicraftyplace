# Desi Crafty Place contact website

A lightweight, mobile-first digital visiting card for the exhibition. It uses only HTML, CSS, and JavaScript—no installation or build step is required.

The **Save contact** button creates a `.vcf` contact card containing Geetanjali's phone, email, business address, social/shop links, description, and logo. On iPhone, open the downloaded card and choose **Create New Contact**.

## Add the final details

Open `src/content.js`. This single file controls:

- Business name and initials
- Owner name and location
- Headline and introduction
- Email, phone, and WhatsApp
- Instagram, Facebook, shop, Pinterest, or any other links
- Profile photo or logo

The two supplied Desi Crafty Place logo files are stored in the `assets` folder. To replace the primary logo later, set its image path in `src/content.js`, for example:

```js
image: './assets/mom-profile.jpg',
```

You can rename or remove any of the sample social links. A link with an empty `url` appears as a clearly marked placeholder.

## Preview locally

Because the JavaScript is split into small modules, view the page through a local web server instead of double-clicking `index.html`.

If Python is installed:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Get the exhibition QR code

The final QR code should be created after the website is published, because it must point to the permanent live address. Once the real details and image are added, publish the site and generate the QR code from that address.

## What to send next

Send the business logo or favorite photo, final email and phone number, WhatsApp number, all social/shop links, and any wording you want changed. The page is ready for those details.
