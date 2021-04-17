echo "-- Install dependencies" &&
npm install &&
echo "-- Build web app"
npm run build &&
rm ./build/static/js/*.map &&
echo "-- Clean tizen directory" &&
tizen clean -- ./build/ &&
echo "-- Build tizen app" &&
cp ./icon.png ./build/icon.png &&
cp ./config.xml ./build/config.xml &&
tizen build-web -- ./build/
echo "-- Sign package" &&
tizen package --type wgt --sign kreniecki -- ./build/.buildResult &&
echo "-- Install"
tizen install -- ./build/.buildResult/ -t UE75RU7092UXXH -n "Twitch.wgt" &&
echo "-- Run" &&
tizen run -p y2L9ixMUyV -t UE75RU7092UXXH
