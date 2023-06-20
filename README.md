# lan-spoof

broadcast a local server as a LAN server in Minecraft.

Protocol based off of [wiki.vg - Ping via LAN](https://wiki.vg/Server_List_Ping#Ping_via_LAN_.28Open_to_LAN_in_Singleplayer.29)

## Installation

```sh
deno install -n lan-spoof -f --allow-net --allow-sys --unstable https://raw.githubusercontent.com/LeoDog896/lan-spoof/main/index.ts
```

Then you can run `lan-spoof`.

The CLI uses [cliffy](https://cliffy.io/), with `--port <port>` and `--motd <motd>` as optional arguments.

## Run Locally

```sh
deno run --allow-net --allow-sys --unstable index.ts
```
