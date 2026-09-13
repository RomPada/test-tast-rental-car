'use client';

import { useEffect } from 'react';

type EasterEggWindow = Window & {
  __rentalCarEasterEggShown?: boolean;
};

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const browserWindow = window as EasterEggWindow;

    if (browserWindow.__rentalCarEasterEggShown) {
      return;
    }

    browserWindow.__rentalCarEasterEggShown = true;

    console.log(
      String.raw`
        _______
       //  ||\ \
 _____//___||_\ \___
 )  _          _    \
 |_/ \________/ \___|
___\_/________\_/_____

🚗 RentalCar Garage

Engine:         running
API:            connected
Console errors: 0
Fuel:           coffee
Developer:      somehow still alive

If you're reading this — you found the secret garage.

┌──────────────────────────────────────┐
│          🚗 RentalCar v1.0          │
├──────────────────────────────────────┤
│ Next.js ................. ✓          │
│ TypeScript ............... ✓          │
│ TanStack Query ........... ✓          │
│ API ...................... ✓          │
│ Console errors ........... 0          │
│ ❌ Free Ferrari not included         │
└──────────────────────────────────────┘
`,
    );
  }, []);

  return null;
}
