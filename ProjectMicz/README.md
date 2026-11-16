# Micz Corner IT Solutions — Alaminos City Demo Websites

Nine mobile-first, standalone website previews for local businesses in Alaminos City, Pangasinan. Each client folder contains its own `index.html`, `styles.css`, `reviews.css`, and `script.js`; there is no build step, package manager, or shared runtime dependency.

## Demo directory

| Category | Business | Preview folder |
|---|---|---|
| Hotels & resorts | Marie's Sleep House | [`01-hotels-resorts/maries-sleep-house/`](./01-hotels-resorts/maries-sleep-house/) |
| Hotels & resorts | Bolo Hills Beach Club | [`01-hotels-resorts/bolo-hills-beach-club/`](./01-hotels-resorts/bolo-hills-beach-club/) |
| Hotels & resorts | Carribean Transient House | [`01-hotels-resorts/carribean-transient-house/`](./01-hotels-resorts/carribean-transient-house/) |
| Restaurants | Along D' Rod Bulaluhan at Kambingan | [`02-restaurants-eateries/along-d-rod-bulaluhan/`](./02-restaurants-eateries/along-d-rod-bulaluhan/) |
| Restaurants | Azon's Crispy Ulo and Sutukil | [`02-restaurants-eateries/azons-crispy-ulo-sutukil/`](./02-restaurants-eateries/azons-crispy-ulo-sutukil/) |
| Restaurants | Golden Cress Restaurant & Events | [`02-restaurants-eateries/golden-cress-restaurant-events/`](./02-restaurants-eateries/golden-cress-restaurant-events/) |
| Clinics | Tanaytay Medical Clinic | [`03-medical-clinics/tanaytay-medical-clinic/`](./03-medical-clinics/tanaytay-medical-clinic/) |
| Clinics | TNF Medical Clinic | [`03-medical-clinics/tnf-medical-clinic/`](./03-medical-clinics/tnf-medical-clinic/) |
| Clinics | Cliniqua Alaminos Medical and Diagnostic Center | [`03-medical-clinics/cliniqua-alaminos-diagnostic/`](./03-medical-clinics/cliniqua-alaminos-diagnostic/) |

## Preview locally

Open any business folder's `index.html` directly in a modern browser, or serve the project root with any static file server. Every website references only files within its own folder; Google Fonts, Font Awesome, and Unsplash photos load from their respective CDNs when online.

## Deploy separately

To publish a demo independently, upload or push only that business folder to its own GitHub repository, then connect that repository to Cloudflare Pages. Select the folder/repository root as the project root and leave the build command blank. The deployed entry point is `index.html`.

## Before a business launch

These are sales previews, not verified business listings. **All displayed prices are illustrative sample rates.** Confirm current rates, phone and Messenger details, hours, exact address, amenities, policies, clinical credentials, accreditation, and service availability directly with each business before publishing. Replace the sample copy and connect each inquiry form to an agreed booking/contact channel. Map buttons use Google Maps search links rather than claiming a verified pin. Photos are illustrative Unsplash images.

Each preview includes a Google profile/reviews panel that opens the business's supplied Google Maps listing. Reviews and ratings are not copied into these demos, so visitors see current information on Google and no review text or score is presented as verified site content. Confirm each listing matches the business before publishing.

## Public reference checks

The provided public links were checked while preparing the previews. Some directory pages exposed only partial information or blocked automated access, so the sites do not fill in missing phone numbers, hours, or service claims by guesswork.

| Business | References | Details exposed during the check |
|---|---|---|
| Marie's Sleep House | [Google Maps](https://www.google.com/maps/search/?api=1&query=Marie%27s+Sleep+House+Alaminos+City&query_place_id=ChIJ4bgbCQXdkzMRck01-vQ-MJ8) · [Trivago](https://www.trivago.com.ph/en-PH/otr/apartments-pangasinan-philippines?search=101-8%3B200-427506) | Maps returned no listing details in the page preview; Trivago blocked access. Poblacion and the approximately 220m city-center proximity came from the project brief. |
| Bolo Hills Beach Club | [Google Maps](https://www.google.com/maps/search/?api=1&query=Bolo+Hills+Beach+Club+Alaminos+City&query_place_id=ChIJLTHncc_ckzMRWK57mxvm47s) · [Agoda](https://www.agoda.com/bolo-hills-beach-club-a-taste-of-paradise/hotel/alaminos-city-ph.html) · [Booking.com](https://www.booking.com/hotel/ph/bolo-hills-beach-club-and-residence-alaminos.html) | Maps returned no listing details; booking pages did not expose usable property details. Bolo 2 came from the project brief. |
| Carribean Transient House | [Google Maps](https://www.google.com/maps/search/?api=1&query=Carribean+Transient+House+Alaminos+City&query_place_id=ChIJu24wPF_bkzMR7yUFMCtWhME) · [Agoda](https://www.agoda.com/a-hundred-smile-at-hundred-islands/hotel/alaminos-city-ph.html) · [Booking.com](https://www.booking.com/hotel/ph/carribean-transient-house.html) | Maps returned no listing details; booking pages did not expose usable property details. Lucap proximity and the group-stay concepts came from the project brief. |
| Along D' Rod Bulaluhan at Kambingan | [Google Maps](https://www.google.com/maps/search/?api=1&query=Along+D%27+Rod+BULALUHAN+AT+KAMBINGAN+Alaminos+City&query_place_id=ChIJT3Z9w9vckzMRHlhcDgCTGmI) · [Restaurant Guru](https://restaurantguru.com/Along-D-Rod-Alaminos) | The directory showed a PHP 1–500 per-person price range; it did not expose a verified menu, phone, or hours in the accessible preview. |
| Azon's Crispy Ulo and Sutukil | [Google Maps](https://www.google.com/maps/search/?api=1&query=Azon%27s+Crispy+Ulo+and+Sutukil+Alaminos+City&query_place_id=ChIJzW62J-vdkzMRajvFpA6Qh7g) · [Restaurant Guru](https://restaurantguru.com/sisig-Alaminos-m8982) | The directory preview identified Filipino, seafood, and vegetarian options; specific menu items, phone, and hours were not verified. |
| Golden Cress Restaurant & Events | [Google Maps](https://www.google.com/maps/search/?api=1&query=Golden+Cress+Restaurant+%26+Events+Alaminos+City&query_place_id=ChIJ2zBi5pHdkzMRonfndu3a3VM) · [GoToEat](https://goldencressrestaurantevents.gotoeat.net/) | GoToEat describes the Olongapo–Bugallon Road location and highlights dumplings and beef noodles. Confirm menu details, hours, event facilities, and availability with the restaurant. |
| Tanaytay Medical Clinic | [Google Maps](https://www.google.com/maps/search/?api=1&query=Tanaytay+Medical+Clinic+Alaminos+City&query_place_id=ChIJWTLjINbdkzMRSHrJBSfx1dg) · [Cybo](https://biashara.cybo.com/PH/alaminos-ilocos/utabibu) | Maps returned no listing details; Cybo blocked access. Clinic hours and services remain unverified. |
| TNF Medical Clinic | [Google Maps](https://www.google.com/maps/search/?api=1&query=TNF+Medical+Clinic+Alaminos+City&query_place_id=ChIJrS3dK87dkzMRHxhoQnMab40) · [ClinicFinderPH](https://www.clinicfinderph.com/clinic/tnf-medical-clinic) · [LTO clinics directory](https://lto-clinics.ryanaque.com/clinic/tnf-medical-clinic-r01-21-002051) | The accessible ClinicFinderPH snippet showed Wednesday and Thursday, 7:30 AM–3:00 PM; it may be incomplete. The LTO directory result did not establish TNF's accreditation or services. |
| Cliniqua Alaminos Medical and Diagnostic Center | [Google Maps](https://www.google.com/maps/search/?api=1&query=Cliniqua+Alaminos+Medical+and+Diagnostic+Center&query_place_id=ChIJAWhydLTdkzMRVg2Y0d7cR-s) · [ClinicFinderPH](https://www.clinicfinderph.com/clinic/cliniqua-alaminos-medical-and-diagnostic-center) | The accessible ClinicFinderPH snippet showed Wednesday, Thursday, and Saturday, 7:30 AM–4:30 PM; it may be incomplete or out of date. Test availability and turnaround were not verified. |

Maps links are the supplied place links, even where their page previews did not return business details.
