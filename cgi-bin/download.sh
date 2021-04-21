#!/bin/sh
echo "Content-type: text/plain;charset=utf-8" # Tells the browser what kind of content to expect
echo ""

read QUERY_STRING
eval $(echo "$QUERY_STRING"|awk -F'&' '{for(i=1;i<=NF;i++){print $i}}')
THEURL=`httpd -d $THEURL`

if [ -z "$THEURL" ]; then
	echo "No URL provided yet"
	echo $THEURL
	echo $QUERY_STRING
	echo `date`
else
	echo "Working on $THEURL"
	youtube-dl -x --audio-format mp3 --restrict-filenames --output "/home/pi/media/Music/YouTube/%(title)s-%(id)s.%(ext)s"  --playlist-items 1 "$THEURL"
fi
