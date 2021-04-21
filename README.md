# Raspberry PI LDNA server and Hotspot

This is a rough work-in-progress of a personal project. Maybe it will be helpful to you in yours.

Goal: Wifi hotspot that my kids can join on car trips, which will allow them to stream music and videos to their own wifi-enabled phones, without requiring anyone to have or use data.

Features:
* Autohotspot connects to your home wifi when it's available, creates a hotspot for kids phones when home network is not available
* DLNA server shares up files to connected devices
* YouTube-DL web interface with queue makes it easy to quickly add new content


Useful Links:
* [Raspberry Pi OS Lite](https://www.raspberrypi.org/software/operating-systems/)
* [Auto Hotspot Installer](https://github.com/RaspberryConnect/AutoHotspot-Installer)
* [MiniDLNA (Now ReadyMedia)](https://pimylifeup.com/raspberrypi-minidlna/)
* [Busybox HTTPD](https://git.busybox.net/busybox/tree/networking/httpd.c)
* [YouTube-DL](https://ytdl-org.github.io/youtube-dl/index.html)


### Install Instructions

```
# Install needed software from apt
sudo apt-get install minidlna ffmpeg 

# apt youtube-dl is too outdated
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod +x /usr/local/bin/youtube-dl

# busybox includes an http server, but it's not enabled
sudo ln /usr/bin/busybox /usr/bin/httpd

# Set up our directory structure
cd /home/pi
mkdir -p media/Music/YouTube
mkdir -p media/Music/Library
mkdir -p media/Movies

# Clone this code into www
git clone https://github.com/stuporglue/ytdl-www-lite.git www
cd www

# Configure http and minidlna servers
cp etc/busyboxhttpd.service /etc/systemd/system/busyboxhttpd.service
cp etc/httpd.conf /etc/httpd.conf
cp etc/minidlna.conf /etc/minidlna.conf
sudo systemctl enable busyboxhttpd
sudo service busyboxhttpd start

# Set up the autohotspot
cd /home/pi
curl "https://www.raspberryconnect.com/images/hsinstaller/AutoHotspot-Setup.tar.gz" -o AutoHotspot-Setup.tar.gz
tar -xzvf AutoHotspot-Setup.tar.gz
cd Autohotspot
sudo ./autohotspot-setup.sh

# Select #2 and follow the prompts to set up autohotspot, then return to the main menu
# Select #5 to add your home wifi info, then return to the main menu
# Select #7 to change your Pi's hotspot info

```

You probably want to [enable SSH](https://phoenixnap.com/kb/enable-ssh-raspberry-pi) at this point so that you can get in later without a keyboard handy.

### Usage Instructions

* Use SSH to copy your music and movies to the Pi's SD card, into the /home/pi/media/ folders
* Use the web interface to download legal, free music from YouTube.
	* This tool is configured to only keep an mp3 of the audio, the video is not kept
	* This tool will only download a single video from a playlist
* Boot your Pi in the car, and connect phones etc. to the hotspot
* In VLC click on Browse and access the content from the Pi
