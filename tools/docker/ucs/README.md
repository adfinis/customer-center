After running the ucs container, launch this command:

```sh
$ docker exec adsycc_ucs1_1  /usr/lib/univention-system-setup/scripts/setup-join.sh
```

To add some dummy data for testing, use:

```sh
$ docker exec adsycc_ucs1_1  /usr/ucs/scripts/fill-dummy-data.sh
```

