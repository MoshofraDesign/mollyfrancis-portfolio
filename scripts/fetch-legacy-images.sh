#!/usr/bin/env bash
# Downloads every image the site still loads from Squarespace's CDN into
# public/legacy/, so the portfolio stops depending on the Squarespace
# subscription. Run it from the project root on a machine with internet:
#
#     bash scripts/fetch-legacy-images.sh
#
# Safe to re-run: files that already exist are skipped. Afterwards, Claude
# rewrites the references in lib/projects.ts and friends using
# scripts/legacy-image-map.json.
set -uo pipefail
mkdir -p public/legacy
ok=0; skip=0; fail=0

dest="public/legacy/screen-shot-2022-11-02-at-8-03-55-pm-31c5b5.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/0a7d94ff-64a3-4bb9-9202-85911eb02bbc/Screen+Shot+2022-11-02+at+8.03.55+PM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/0a7d94ff-64a3-4bb9-9202-85911eb02bbc/Screen+Shot+2022-11-02+at+8.03.55+PM.png"
  fi
fi

dest="public/legacy/web-sweetgrass-a27d87.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422381428436-R3GEUY7IA5DQY6BXAO4H/web-sweetgrass.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422381428436-R3GEUY7IA5DQY6BXAO4H/web-sweetgrass.jpg"
  fi
fi

dest="public/legacy/52f2bf9d604c0-4e5647.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422474229873-WVIY6F1FUOJNEB2LIS69/52f2bf9d604c0.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1422474229873-WVIY6F1FUOJNEB2LIS69/52f2bf9d604c0.jpg"
  fi
fi

dest="public/legacy/venetian-07809b.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492117511-NYQZT9PR0Y0NULZA2PVF/venetian.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492117511-NYQZT9PR0Y0NULZA2PVF/venetian.png"
  fi
fi

dest="public/legacy/temptaion-af8243.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492117946-E967FF9AR5FE6Z769YRZ/temptaion.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492117946-E967FF9AR5FE6Z769YRZ/temptaion.png"
  fi
fi

dest="public/legacy/web-bombshell-411fd3.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492582146-8CG7TNOVTMUVBXD8YYV0/web-bombshell.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492582146-8CG7TNOVTMUVBXD8YYV0/web-bombshell.jpg"
  fi
fi

dest="public/legacy/combi-170569.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492886734-FJ69AYIZ87IDZTHDAOZR/combi.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492886734-FJ69AYIZ87IDZTHDAOZR/combi.png"
  fi
fi

dest="public/legacy/web-vestidos-e82c30.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492906906-X91PFJ8K71PIR26M5PAK/web-vestidos.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492906906-X91PFJ8K71PIR26M5PAK/web-vestidos.jpg"
  fi
fi

dest="public/legacy/web-pewter-e96cae.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492906956-4BBIIG1S5QG8WMVAMVAJ/web-pewter.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492906956-4BBIIG1S5QG8WMVAMVAJ/web-pewter.jpg"
  fi
fi

dest="public/legacy/web-hillbillystills-360970.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492907480-F8C5VAWAIOK73SP4ICZZ/web-hillbillystills.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492907480-F8C5VAWAIOK73SP4ICZZ/web-hillbillystills.jpg"
  fi
fi

dest="public/legacy/web-express-512a9d.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492907630-PKRIA7S5BTR64JOJYT7G/web-express.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492907630-PKRIA7S5BTR64JOJYT7G/web-express.jpg"
  fi
fi

dest="public/legacy/modernliving2-8f185a.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492987626-03RPZRPX9V2U1W6BU9N0/modernliving2.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1423492987626-03RPZRPX9V2U1W6BU9N0/modernliving2.jpg"
  fi
fi

dest="public/legacy/image-asset-730808.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542691474-54ZUVT0SMV4KUESUG9X6/image-asset.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542691474-54ZUVT0SMV4KUESUG9X6/image-asset.png"
  fi
fi

dest="public/legacy/image-asset-1e27ed.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542831010-IXQ56XR6374O1BYZQ6LK/image-asset.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542831010-IXQ56XR6374O1BYZQ6LK/image-asset.png"
  fi
fi

dest="public/legacy/image-asset-94c04c.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542909021-QGKA1KCN566886NHKS47/image-asset.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462542909021-QGKA1KCN566886NHKS47/image-asset.png"
  fi
fi

dest="public/legacy/image-asset-e4093e.jpeg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889690104-X4CR0710EAPEKFKS1GD9/image-asset.jpeg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889690104-X4CR0710EAPEKFKS1GD9/image-asset.jpeg"
  fi
fi

dest="public/legacy/image-asset-7a9a34.jpeg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889711347-3CZHI632LG7AJPVYK37G/image-asset.jpeg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889711347-3CZHI632LG7AJPVYK37G/image-asset.jpeg"
  fi
fi

dest="public/legacy/image-asset-4c5ff3.jpeg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889728893-PFO6HB9TJDOYN5M0HT7G/image-asset.jpeg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462889728893-PFO6HB9TJDOYN5M0HT7G/image-asset.jpeg"
  fi
fi

dest="public/legacy/image-asset-0ef1a7.jpeg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462890251993-3RRX7PD8KCSM2MB4DXP6/image-asset.jpeg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462890251993-3RRX7PD8KCSM2MB4DXP6/image-asset.jpeg"
  fi
fi

dest="public/legacy/01-3-admin-notification-d3e6ee.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893263481-GH93PMP36ECBJITKXI97/01-3+-+Admin+Notification.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893263481-GH93PMP36ECBJITKXI97/01-3+-+Admin+Notification.jpg"
  fi
fi

dest="public/legacy/old-dashboard-landing-ab3cca.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893263562-TPA3IIUV00PKF9KU1J61/OLD-Dashboard-Landing.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893263562-TPA3IIUV00PKF9KU1J61/OLD-Dashboard-Landing.jpg"
  fi
fi

dest="public/legacy/01-2-top-nav-account-dropdown-cacd2d.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893264133-1HB13QG0TKQ1AL9MLZWO/01-2+-+Top+Nav+-+Account+Dropdown.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893264133-1HB13QG0TKQ1AL9MLZWO/01-2+-+Top+Nav+-+Account+Dropdown.jpg"
  fi
fi

dest="public/legacy/01-1-top-nav-subnav-46d3bb.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893264400-VHB0BCUP27M7KI7T7721/01-1+-+Top+Nav+-SubNav.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893264400-VHB0BCUP27M7KI7T7721/01-1+-+Top+Nav+-SubNav.jpg"
  fi
fi

dest="public/legacy/04-1-products-search-dropdown-e042d5.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846066-VJ7G4Y7Q70V9DQB2755Y/04-1+-+Products+-+Search+Dropdown.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846066-VJ7G4Y7Q70V9DQB2755Y/04-1+-+Products+-+Search+Dropdown.jpg"
  fi
fi

dest="public/legacy/04-3-products-settings-dropdown-3aad07.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846614-BNH6SJJ0FPR2T6DKHVJV/04-3+-+Products+-+Settings+Dropdown.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846614-BNH6SJJ0FPR2T6DKHVJV/04-3+-+Products+-+Settings+Dropdown.jpg"
  fi
fi

dest="public/legacy/04-2-products-search-7d4be7.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846722-JJI1JWGLT9V0AOGIU0T4/04-2+-+Products+-+Search.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893846722-JJI1JWGLT9V0AOGIU0T4/04-2+-+Products+-+Search.jpg"
  fi
fi

dest="public/legacy/02-2-products-grid-hover-single-a124a7.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847163-A8RCW12MLK1L8HF31S19/02-2+-+Products+-+Grid+-Hover+Single.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847163-A8RCW12MLK1L8HF31S19/02-2+-+Products+-+Grid+-Hover+Single.jpg"
  fi
fi

dest="public/legacy/02-1-products-grid-4740cd.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847300-J3TO347Y1HC2PGN012V3/02-1+-+Products+Grid.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847300-J3TO347Y1HC2PGN012V3/02-1+-+Products+Grid.jpg"
  fi
fi

dest="public/legacy/02-3-products-grid-hover-multiple-411a5c.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847913-PTIZDDPSH2LIQXAUL7J2/02-3+-+Products+-+Grid+-+Hover+Multiple.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462893847913-PTIZDDPSH2LIQXAUL7J2/02-3+-+Products+-+Grid+-+Hover+Multiple.jpg"
  fi
fi

dest="public/legacy/order-page-new-9ace82.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462933946295-QSEVGLELQHKVKHNKJA2Q/-Order+Page-NEW.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1462933946295-QSEVGLELQHKVKHNKJA2Q/-Order+Page-NEW.jpg"
  fi
fi

dest="public/legacy/devices-6cb33b.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965854643-56K9O8S9XMT6ZK4P38J8/Devices.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511965854643-56K9O8S9XMT6ZK4P38J8/Devices.png"
  fi
fi

dest="public/legacy/image-asset-e5019f.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511967913957-U3LHYLLHH507187LL8WZ/image-asset.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511967913957-U3LHYLLHH507187LL8WZ/image-asset.png"
  fi
fi

dest="public/legacy/image-asset-06a4d4.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511968056680-OYW7HQTA481IA0KX2EV3/image-asset.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1511968056680-OYW7HQTA481IA0KX2EV3/image-asset.png"
  fi
fi

dest="public/legacy/1-0b3a0b.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052373839-DA345Q6MBX2L3GTAFUJH/1.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052373839-DA345Q6MBX2L3GTAFUJH/1.png"
  fi
fi

dest="public/legacy/2-76c8be.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052602566-26V6KZU2NGIHU07IIP90/2.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052602566-26V6KZU2NGIHU07IIP90/2.png"
  fi
fi

dest="public/legacy/3-9c4b03.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052727029-3KBO4H3QWR38EJZKSGZ3/3.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512052727029-3KBO4H3QWR38EJZKSGZ3/3.png"
  fi
fi

dest="public/legacy/image-asset-b1175a.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512053462663-OQUN662NOW47OD7YADHH/image-asset.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1512053462663-OQUN662NOW47OD7YADHH/image-asset.png"
  fi
fi

dest="public/legacy/screen-shot-2017-12-15-at-8-37-37-am-7013f8.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513348975246-YKX6GH1QTGSD7AYQAJJ2/Screen+Shot+2017-12-15+at+8.37.37+AM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513348975246-YKX6GH1QTGSD7AYQAJJ2/Screen+Shot+2017-12-15+at+8.37.37+AM.png"
  fi
fi

dest="public/legacy/screen-shot-2017-12-15-at-8-44-23-am-5606ba.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349151416-RF4TP9N5LWQVAAVQGQB7/Screen+Shot+2017-12-15+at+8.44.23+AM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349151416-RF4TP9N5LWQVAAVQGQB7/Screen+Shot+2017-12-15+at+8.44.23+AM.png"
  fi
fi

dest="public/legacy/screen-shot-2017-12-15-at-8-51-43-am-42cc08.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349531314-89U1IJ39DE46WB88QYI0/Screen+Shot+2017-12-15+at+8.51.43+AM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1513349531314-89U1IJ39DE46WB88QYI0/Screen+Shot+2017-12-15+at+8.51.43+AM.png"
  fi
fi

dest="public/legacy/ch-current-myhealth-5f03d1.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555335056852-1WDNMCGCPZAVC7GBU365/CH-Current-MyHealth.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555335056852-1WDNMCGCPZAVC7GBU365/CH-Current-MyHealth.png"
  fi
fi

dest="public/legacy/ch-current-navigation-25506e.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555335711321-VWKGE5EMWNE0E69EP9KD/CH-Current-Navigation.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555335711321-VWKGE5EMWNE0E69EP9KD/CH-Current-Navigation.png"
  fi
fi

dest="public/legacy/ch-myhealth-9fc070.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555437931422-FA85FIDWKHIDE0549C67/CH-MyHealth.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555437931422-FA85FIDWKHIDE0549C67/CH-MyHealth.png"
  fi
fi

dest="public/legacy/ch-dashboard-5c62f6.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462027297-GRU05DN2D33B2JIOLPDP/CH-Dashboard.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462027297-GRU05DN2D33B2JIOLPDP/CH-Dashboard.png"
  fi
fi

dest="public/legacy/ch-navigation-horz-04-003cbb.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462092362-M7ZKRJUT3DHC4SR7NI7H/CH-Navigation-Horz-04.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1555462092362-M7ZKRJUT3DHC4SR7NI7H/CH-Navigation-Horz-04.png"
  fi
fi

dest="public/legacy/patient-careplans-landing-copy-2-13759d.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469800892-B0L920CQQ1NRG9FD0HAL/Patient-CarePlans-Landing+Copy+2.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1558469800892-B0L920CQQ1NRG9FD0HAL/Patient-CarePlans-Landing+Copy+2.png"
  fi
fi

dest="public/legacy/accounts-multiple-611c4c.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580743086322-L6ILER7K3CPFW4WMCO1E/Accounts-Multiple.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1580743086322-L6ILER7K3CPFW4WMCO1E/Accounts-Multiple.png"
  fi
fi

dest="public/legacy/definition-device-product-f3bc05.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667325725320-HBQC7TAFA1KHYYNWII6T/Definition-Device-product.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667325725320-HBQC7TAFA1KHYYNWII6T/Definition-Device-product.png"
  fi
fi

dest="public/legacy/definition-device-home-1c10ca.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667325725456-C9Y95F7G9ZJ62SX46B54/Definition-Device-Home.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667325725456-C9Y95F7G9ZJ62SX46B54/Definition-Device-Home.png"
  fi
fi

dest="public/legacy/stfrancis-device-product-be231a.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326779753-C3DXSBEL52V7O1YV5E56/StFrancis-Device-Product.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326779753-C3DXSBEL52V7O1YV5E56/StFrancis-Device-Product.png"
  fi
fi

dest="public/legacy/stfrancis-device-category-0bec36.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326779786-81IQWBLOAPRPKSH3LK1R/StFrancis-Device-Category.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326779786-81IQWBLOAPRPKSH3LK1R/StFrancis-Device-Category.png"
  fi
fi

dest="public/legacy/stfrancis-device-home-569ddb.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326780441-08UMYK6WSYKQE5NJ7JMU/StFrancis-Device-Home.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667326780441-08UMYK6WSYKQE5NJ7JMU/StFrancis-Device-Home.png"
  fi
fi

dest="public/legacy/01-d1202f.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489521988-W8AEB4S7N95NOK3EGATT/01.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489521988-W8AEB4S7N95NOK3EGATT/01.jpg"
  fi
fi

dest="public/legacy/02-3d2c72.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489522479-0LRNRNG9G4T94WYVXNX3/02.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489522479-0LRNRNG9G4T94WYVXNX3/02.jpg"
  fi
fi

dest="public/legacy/03-ba61e6.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489523077-U6FA01YB37HK8NWKNHDU/03.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489523077-U6FA01YB37HK8NWKNHDU/03.jpg"
  fi
fi

dest="public/legacy/submit-11bc30.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489524593-1VI6DO5CFVOIJXS8BCS2/Submit.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489524593-1VI6DO5CFVOIJXS8BCS2/Submit.jpg"
  fi
fi

dest="public/legacy/landing-1af1c1.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489640575-FE1X3BSOCUHJVV45MVW0/Landing.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667489640575-FE1X3BSOCUHJVV45MVW0/Landing.jpg"
  fi
fi

dest="public/legacy/sign-up-sso-465949.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510256928-D05OT1UPL3PICYJ296ZZ/Sign+up_SSO.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510256928-D05OT1UPL3PICYJ296ZZ/Sign+up_SSO.png"
  fi
fi

dest="public/legacy/clockin-out-bbde38.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257513-OCKLE4YPR6H1MXFZ4MQP/--ClockIn-Out.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257513-OCKLE4YPR6H1MXFZ4MQP/--ClockIn-Out.png"
  fi
fi

dest="public/legacy/timesheets-week-hours-0hours-d9955b.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257556-BF5O4X105U0SB43QPU8A/Timesheets-Week-Hours-0Hours.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510257556-BF5O4X105U0SB43QPU8A/Timesheets-Week-Hours-0Hours.png"
  fi
fi

dest="public/legacy/inbox-messages-tab-swipe-action-d6910e.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510258030-WMB043V9JK4LBO79MOR9/Inbox+-+Messages+tab+-+Swipe+action.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667510258030-WMB043V9JK4LBO79MOR9/Inbox+-+Messages+tab+-+Swipe+action.png"
  fi
fi

dest="public/legacy/print-shopgrl-copy-17855b.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667590765493-U248DF258FOBXNGKRNUX/print-shopgrl%2Bcopy.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667590765493-U248DF258FOBXNGKRNUX/print-shopgrl%2Bcopy.jpg"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-47-45-pm-d9d011.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667590776300-6QQP3A0SGY3E1SSQTW2H/Screen%2BShot%2B2022-11-03%2Bat%2B1.47.45%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667590776300-6QQP3A0SGY3E1SSQTW2H/Screen%2BShot%2B2022-11-03%2Bat%2B1.47.45%2BPM.png"
  fi
fi

dest="public/legacy/holiday1-2-43-23-pm-5fc6cd.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094175-0ZZBPBUC2XOYMON8UNJC/holiday1+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094175-0ZZBPBUC2XOYMON8UNJC/holiday1+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/holiday2-2-43-23-pm-988eb2.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094207-HNEM47TFPX4AZ32Z9RH6/Holiday2+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094207-HNEM47TFPX4AZ32Z9RH6/Holiday2+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/volusion-holidaycard-2-43-24-pm-03f602.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094816-KPNMAKBPL1DPSNO4SFL7/Volusion-HolidayCard+2.43.24+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591094816-KPNMAKBPL1DPSNO4SFL7/Volusion-HolidayCard+2.43.24+PM.jpg"
  fi
fi

dest="public/legacy/cw-winter-2013-specialedition-2-43-23-pm-406d52.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591258255-KMJOCCDALMUWU0T039W0/cw-winter-2013-specialedition+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591258255-KMJOCCDALMUWU0T039W0/cw-winter-2013-specialedition+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/cw-fall-2013-2-43-23-pm-aa62a3.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591258473-AVMBX10G1K86Y4BEOWMM/cw-fall-2013+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591258473-AVMBX10G1K86Y4BEOWMM/cw-fall-2013+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-55-32-pm-3a7031.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591260063-M820WMIOE9EAM0IM16XA/Screen%2BShot%2B2022-11-03%2Bat%2B1.55.32%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591260063-M820WMIOE9EAM0IM16XA/Screen%2BShot%2B2022-11-03%2Bat%2B1.55.32%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-45-43-pm-84330e.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591552506-LL9YL5D47JFB4RRLYYCU/Screen%2BShot%2B2022-11-03%2Bat%2B1.45.43%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591552506-LL9YL5D47JFB4RRLYYCU/Screen%2BShot%2B2022-11-03%2Bat%2B1.45.43%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-45-29-pm-90bfd0.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591552901-ZUK91M7N582K9KDG5PSF/Screen%2BShot%2B2022-11-03%2Bat%2B1.45.29%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591552901-ZUK91M7N582K9KDG5PSF/Screen%2BShot%2B2022-11-03%2Bat%2B1.45.29%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-46-10-pm-f5e785.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591553656-FXXC6HMDFLIHM7BHY6I2/Screen%2BShot%2B2022-11-03%2Bat%2B1.46.10%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591553656-FXXC6HMDFLIHM7BHY6I2/Screen%2BShot%2B2022-11-03%2Bat%2B1.46.10%2BPM.png"
  fi
fi

dest="public/legacy/print-madebyjoy-2-43-23-pm-942091.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627216-YERG84UEVVK0FQYHOWS3/print-madebyjoy+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627216-YERG84UEVVK0FQYHOWS3/print-madebyjoy+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/print-fromevelyn-2-43-23-pm-89f078.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627485-TVIXZEO42AQLQEV6WBMK/print-fromevelyn+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627485-TVIXZEO42AQLQEV6WBMK/print-fromevelyn+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/print-vitagals-2-43-23-pm-4c7209.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627963-LAOW14896A4HSFWN1JDC/print-vitagals+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591627963-LAOW14896A4HSFWN1JDC/print-vitagals+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/adri-2-43-24-pm-741879.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591686173-DC0V25R1YOFRETGHABIE/Adri+2.43.24+PM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591686173-DC0V25R1YOFRETGHABIE/Adri+2.43.24+PM.png"
  fi
fi

dest="public/legacy/print-christineinvite-2-43-23-pm-c6bd1c.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591686493-JJ6K1BAI23L7F1EBO2YQ/print-christineinvite+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591686493-JJ6K1BAI23L7F1EBO2YQ/print-christineinvite+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/amor-2-43-23-pm-e2878a.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591721541-JO4705XY7T8VL8UG1O7B/Amor+2.43.23+PM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591721541-JO4705XY7T8VL8UG1O7B/Amor+2.43.23+PM.png"
  fi
fi

dest="public/legacy/fakeittilyamakeit-2-43-23-pm-a5e5df.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591721618-TO18J4QVCDKMNODTACKH/FakeItTilYaMakeIt+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591721618-TO18J4QVCDKMNODTACKH/FakeItTilYaMakeIt+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/print-memyselfi-2-43-23-pm-09f2ab.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591722530-FYH33FRLO67SWQEDTP4M/print-memyselfi+2.43.23+PM.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591722530-FYH33FRLO67SWQEDTP4M/print-memyselfi+2.43.23+PM.jpg"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-52-54-pm-fe9251.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591891691-I9JWERCKS5T60MYBRWJW/Screen%2BShot%2B2022-11-03%2Bat%2B1.52.54%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591891691-I9JWERCKS5T60MYBRWJW/Screen%2BShot%2B2022-11-03%2Bat%2B1.52.54%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2021-12-01-at-12-59-55-pm-e6f3ce.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591895955-V45CCDPTK02VQ0ATLKCR/Screen+Shot+2021-12-01+at+12.59.55+PM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667591895955-V45CCDPTK02VQ0ATLKCR/Screen+Shot+2021-12-01+at+12.59.55+PM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-53-54-pm-285085.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667592293689-0HWYCXINWWPXW3G24UK6/Screen%2BShot%2B2022-11-03%2Bat%2B1.53.54%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667592293689-0HWYCXINWWPXW3G24UK6/Screen%2BShot%2B2022-11-03%2Bat%2B1.53.54%2BPM.png"
  fi
fi

dest="public/legacy/babybemine-9fb181.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593459897-0H5XDZOLOJNWD1QHTUEQ/babybemine.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593459897-0H5XDZOLOJNWD1QHTUEQ/babybemine.png"
  fi
fi

dest="public/legacy/allah-85ae14.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593460100-JGCQW5ZI42N7ERKNAXRR/allah.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593460100-JGCQW5ZI42N7ERKNAXRR/allah.png"
  fi
fi

dest="public/legacy/bass-9386b0.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593460738-R59BUTVUBCYPA19EXSLQ/bass.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593460738-R59BUTVUBCYPA19EXSLQ/bass.png"
  fi
fi

dest="public/legacy/blackstarr-248154.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461261-1FJMQFNCHKCDFEL0CLY1/blackstarr.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461261-1FJMQFNCHKCDFEL0CLY1/blackstarr.png"
  fi
fi

dest="public/legacy/chisholmtrail-2a8d9d.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461718-KQL0JND2R1XG9WJBFNIR/chisholmtrail.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461718-KQL0JND2R1XG9WJBFNIR/chisholmtrail.png"
  fi
fi

dest="public/legacy/circle7-639ac5.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461933-4GD54TS6L8BLHQ356MAW/circle7.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593461933-4GD54TS6L8BLHQ356MAW/circle7.png"
  fi
fi

dest="public/legacy/countryhearth-04ac7c.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593462450-K18FXOTL5WC36UWBR8ML/countryhearth.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593462450-K18FXOTL5WC36UWBR8ML/countryhearth.png"
  fi
fi

dest="public/legacy/dunhamcarr-10ff13.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593462820-7LJZAXVEAFTPZKMWD7XZ/dunhamcarr.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593462820-7LJZAXVEAFTPZKMWD7XZ/dunhamcarr.png"
  fi
fi

dest="public/legacy/gigglepoo-e4756f.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463214-AW8X3YLIHXQIB1GVFWA6/gigglepoo.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463214-AW8X3YLIHXQIB1GVFWA6/gigglepoo.png"
  fi
fi

dest="public/legacy/jessicalynn-210f5e.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463438-H01437G4FTC82RMWEJFE/jessicalynn.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463438-H01437G4FTC82RMWEJFE/jessicalynn.png"
  fi
fi

dest="public/legacy/jilli-29116f.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463885-9Z9XMQ3QPWAX72K8281K/jilli.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593463885-9Z9XMQ3QPWAX72K8281K/jilli.png"
  fi
fi

dest="public/legacy/kristinanderson-61c9e4.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593464186-GEEJB3SIXK8CG11V5QL1/kristinanderson.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593464186-GEEJB3SIXK8CG11V5QL1/kristinanderson.png"
  fi
fi

dest="public/legacy/malaka-299bcf.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593464695-4UFYQVQLPH5CH911VEND/malaka.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593464695-4UFYQVQLPH5CH911VEND/malaka.png"
  fi
fi

dest="public/legacy/mylittlejewel-ad7648.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465023-GVM99XE3TSHFU3NXLLJD/mylittlejewel.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465023-GVM99XE3TSHFU3NXLLJD/mylittlejewel.png"
  fi
fi

dest="public/legacy/origami-fa2bbd.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465336-303KAM619OC98GX6XAFT/origami.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465336-303KAM619OC98GX6XAFT/origami.png"
  fi
fi

dest="public/legacy/orionleather-d1904d.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465947-M92PQ2T8DP9M3I6G6NHE/orionleather.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593465947-M92PQ2T8DP9M3I6G6NHE/orionleather.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-42-49-pm-36267d.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466025-49K9OCCEH1L707AMJMWE/Screen%2BShot%2B2022-11-03%2Bat%2B1.42.49%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466025-49K9OCCEH1L707AMJMWE/Screen%2BShot%2B2022-11-03%2Bat%2B1.42.49%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-50-18-pm-8e0293.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466845-VEVOKWETUJ91PJBONWDG/Screen%2BShot%2B2022-11-03%2Bat%2B1.50.18%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466845-VEVOKWETUJ91PJBONWDG/Screen%2BShot%2B2022-11-03%2Bat%2B1.50.18%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-1-51-31-pm-0c0410.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466999-H83JWA8KFZ0QYRQH0OCP/Screen%2BShot%2B2022-11-03%2Bat%2B1.51.31%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593466999-H83JWA8KFZ0QYRQH0OCP/Screen%2BShot%2B2022-11-03%2Bat%2B1.51.31%2BPM.png"
  fi
fi

dest="public/legacy/screen-shot-2022-11-03-at-2-11-18-pm-ce293f.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467310-LC1EG7AQ8F4OTWTVV1G0/Screen%2BShot%2B2022-11-03%2Bat%2B2.11.18%2BPM.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467310-LC1EG7AQ8F4OTWTVV1G0/Screen%2BShot%2B2022-11-03%2Bat%2B2.11.18%2BPM.png"
  fi
fi

dest="public/legacy/southernliving-3d9e48.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467731-14TVIV315JH0H3ZV4VH9/southernliving.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467731-14TVIV315JH0H3ZV4VH9/southernliving.png"
  fi
fi

dest="public/legacy/sparko-cab190.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467846-V31NHJHRLP9YB31CKXAZ/sparko.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593467846-V31NHJHRLP9YB31CKXAZ/sparko.png"
  fi
fi

dest="public/legacy/templatetrader-e2f044.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593468849-3XUNRWTD7XJE87RD1HBD/templatetrader.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593468849-3XUNRWTD7XJE87RD1HBD/templatetrader.png"
  fi
fi

dest="public/legacy/usabride-d7fcd1.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593468958-IGEUTR1VLOFR11UIPKWM/usabride.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593468958-IGEUTR1VLOFR11UIPKWM/usabride.png"
  fi
fi

dest="public/legacy/wonkos-b9e715.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593469432-YRO0O6NVTMT6RPUCR9BW/wonkos.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1667593469432-YRO0O6NVTMT6RPUCR9BW/wonkos.png"
  fi
fi

dest="public/legacy/provencal-thumb-492732.jpg"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1715958656162-PXTW17VCIIGQ6O2QJWPV/provencal-thumb.jpg"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/1715958656162-PXTW17VCIIGQ6O2QJWPV/provencal-thumb.jpg"
  fi
fi

dest="public/legacy/bh-portfax-b28d84.png"
if [ -s "$dest" ]; then
  skip=$((skip+1))
else
  if curl -fsSL --retry 3 --max-time 60 -o "$dest" "https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/6a83a6f4-3382-4474-a3d6-85c0bad4e6df/BH-PortFax.png"; then
    ok=$((ok+1)); echo "  ok   ${dest}"
  else
    fail=$((fail+1)); rm -f "$dest"; echo "  FAIL ${dest}  <- https://images.squarespace-cdn.com/content/v1/5387376ae4b08610fe281471/6a83a6f4-3382-4474-a3d6-85c0bad4e6df/BH-PortFax.png"
  fi
fi

echo
echo "downloaded: $ok   already had: $skip   failed: $fail"
echo "total files in public/legacy: $(ls -1 public/legacy 2>/dev/null | wc -l | tr -d ' ')"
