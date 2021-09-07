# SHUTTLEDECK (space-js13k2021)
## Play it online NOW
- 🚀🃏 SHUTTLEDECK 🃏🚀 is a game inspired by infinite-runners merged with deck-builders.
- It is Desktop & Mobile friendly :)
- https://arikwex.github.io/space-js13k2021/

<img width="400" alt="Screen Shot 2021-09-07 at 6 06 26 PM" src="https://user-images.githubusercontent.com/1320825/132416843-8183f884-1eca-467e-9041-a09208b342cc.png">
<img width="400" alt="Screen Shot 2021-09-07 at 5 53 28 PM" src="https://user-images.githubusercontent.com/1320825/132416672-2cd11e77-100c-4516-b352-4b8adf7fa7c0.png">

## How to play
You control the vessel of a Space Courier delivering a very important package. To win, you'll need to successfully reach multiple consecutive planets while avoiding the dangers along the way. Collect minerals to purchase ship upgrades. Encounter quirky characters selling sketchy merchandise. Build your set of abilities and hone your timing and strategy.

Gameplay Tutorial:
- Avoid obstacles which damage your shields. Depleting your shields means Game Over.
- Tap/Click the cards on the UI to use abilities.
- You can only use an ability if you have sufficient energy (bottom right meter) to use it.
- The most basic abilities are "lane changes" to avoid obstacles (red, green, blue cards).
- Between planets, you'll be able to purchase new ability cards.
- Weapon abilities can be used to destroy obstacles (orange cards).
- Ship abilities have special functions like healing or invulnerability (magenta cards).

- Blessings can be granted to upgrade max energy, max shields, and hand size.

## Development
```
# Setup
nvm use
npm i

# Build tools
npm run dev:fast # Build + watch src with rollup but do not minify code
npm run dev:mid  # Build + watch src with rollup & minify
npm run dev      # Build + watch src with rollup & minify & roadroller
npm run build    # Build the full package once
```
The build tools will always output:
- index.html (The single html file you can open in browser to play)
- build.zip (The zipped html file which should be under 13,312 bytes when using `npm run build`)
