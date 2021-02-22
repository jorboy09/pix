#!/bin/sh

if [ -f /run/nginx.pid ]; then
   /etc/init.d/nginx reload
else
   /etc/init.d/nginx start
fi